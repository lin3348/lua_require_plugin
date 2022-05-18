# luarequire README
## Features
* alt+a 快速将当前行require代码提取到文件头部，并删除第一级目录。删除第一级目录的特性只针对特定工程
* luarequire.searchPath 配置根搜索路径，require时会自动修正。默认搜索路径为 ["Logic","Framework","HFModule","Settings","ToLua"]

![luarequire-help](https://github.com/lin3348/luarequire_plugin/blob/203f3be3b034a6c47a19a4ad391fca1b56a87a51/res/luarequire-help.gif?raw=true)

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
