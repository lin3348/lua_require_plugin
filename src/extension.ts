// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { sep } from 'path';
import * as vscode from 'vscode';

let LINE_SEPERATOR = /\n|\r\n/;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	var luaideConfig = vscode.workspace.getConfiguration("luarequire");
    var searchPath = luaideConfig.get("searchPath") as string[];

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luarequire" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('luarequire.collating', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Reload:LuaRequire!');
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let document = editor.document;

        let content = document.getText();
		let selection = editor.selection;
        
        let selectRange = document.lineAt(selection.active).range;
        let selectedLineText = document.getText(selectRange); 

        let xx = new vscode.Range(selectRange.start, new vscode.Position(selectRange.end.line, selectRange.end.character + 2));
        let selectedLineText2 = document.getText(xx); 
        console.log(selectedLineText2);

        let matchPartern = selectedLineText.match(/require\((.*?)\)/); 
        if (matchPartern === null) {
           return; 
        }

        let isInnerMatchPartern = selectedLineText.match(/^\s+/) !== null; 

        let spe = "\n";
        if (content.indexOf("\r\n") > -1) {
           spe = "\r\n"; 
        }

        let lines = content.split(LINE_SEPERATOR);
        let headerRange: vscode.Range = new vscode.Range(0, 0, 0, 0);
        let headerLine = ""; // 头部插入的新require

        let firstFound = -1;
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            if (line.trim() === "") {
                continue;
            }

            let found = line.match(/^local [\w_]* = require\(/);
            if (!found && firstFound !== -1) {
                break;
            }
            if (found) {
                firstFound = index;
                continue;
            }
        }

        if (firstFound > -1) {
            let lastLine = lines[firstFound];
            let replcePos = new vscode.Position(firstFound, lastLine.length);
            headerRange = new vscode.Range(replcePos, replcePos);
        }

        let oldRequire = matchPartern[1].replace(/['"]/g, "");
        let filePaths = oldRequire.split(".");

        let oldRequire2 = oldRequire;
        let idx = searchPath.findIndex((str) => oldRequire.indexOf(str) === 0);
        if (idx > -1) {
            oldRequire2 = oldRequire.slice(searchPath[idx].length+1);
        }
        
        let varName = filePaths[filePaths.length - 1];
        let newRequire = `local ${varName} = require("${oldRequire2}")`;

        let newLine = selectedLineText.replace(matchPartern[0], varName);

        let headContent = lines.slice(0, firstFound+1).join("\n");
        if (headContent.indexOf(newRequire) === -1) {
            headerLine = newRequire;
        }

        editor.edit(function (builder) {
            let headerLine2 = headerLine;
            
            if (isInnerMatchPartern) {
                builder.replace(selectRange, newLine); // 选中行替换
                if (headerLine !== "") { // 插入头部require
                    headerLine2 = spe + headerLine;
                    if (firstFound === -1) { //插入首行要补充一个换行符
                        headerLine2 += spe;
                    }
                    builder.insert(headerRange.end, headerLine2);
                }
            } else {
                if (headerLine !== "") {
                    builder.replace(selectRange, headerLine2);
                }
            }
        }).then(function (success) {
            // TODO: unselect the text
        });
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
