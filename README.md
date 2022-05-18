# luarequire README
## Features
* 安装release目录下的插件到vscode, 拖放插件到vscode的插件区域即可
* alt+a 快速将当前行require代码提取到文件头部，并删除第一级目录。删除第一级目录的特性只针对特定工程
* luarequire.searchPath 配置根搜索路径，require时会自动修正。默认搜索路径为 ["Logic","Framework","HFModule","Settings","ToLua"]

![luarequire-help](https://github.com/lin3348/luarequire_plugin.git/res/luarequire-help.gif)

```
function Test()
    local id = 0
    local bagModule = require("Logic.Bag.BagModule") -- 可以通过emmulyLua补全
    local bag = bagModule.GetBagById(id)
    bag.BuySomething()
end

提取为：

local BagModule = require("Bag.BagModule")

function Test()
    local id = 0
    local bagModule = BagModule
    local bag = bagModule.GetBagById(id)
    bag.BuySomething()
end
```
