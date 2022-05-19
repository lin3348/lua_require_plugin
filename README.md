# luarequire README
## Features
* shortcut "alt+a" can quick fix the require function that allow you require any where without navigate into file header.
* setting luarequire.searchPath config package.path which will root the modules. default root path is["Logic","Framework","HFModule","Settings","ToLua"] that you can modify as you like.

![luarequire-help](https://github.com/lin3348/luarequire_plugin/blob/203f3be3b034a6c47a19a4ad391fca1b56a87a51/res/luarequire-help.gif?raw=true)

Origin Code :

```
function Test()
    local id = 0
    local bagModule = require("Logic.Bag.BagModule") -- 可以通过emmulyLua补全
    local bag = bagModule.GetBagById(id)
    bag.BuySomething()
end
```

After alt+a :

```
local BagModule = require("Bag.BagModule")

function Test()
    local id = 0
    local bagModule = BagModule
    local bag = bagModule.GetBagById(id)
    bag.BuySomething()
end
```
