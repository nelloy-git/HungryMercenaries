function isModuleAvailable(name: string){
    if (_G.package.loaded[name]){
        return true
    }

    for (const [_, loader] of ipairs(_G.package.loaders)){
        if (typeof loader === 'string'){
            return true
        }

        let init = loader(name)
        if (typeof init === 'function'){
            _G.package.preload[name] = init
            return true
        }

        return false
    }
}

const origin_require = _G.require
_G.require = (name: string) => {
    let [success, module] = pcall(origin_require, name)
    // print(name, success, module)
    if (!success){
        if (!(<string>module).startsWith('module')){
            throw module
        }

        [success, module] = pcall(origin_require, name + '.index')
        if (!success){
            throw module
        }
    }

    return module

    // let is_available = isModuleAvailable(name)
    // if (!is_available){
    //     is_available = isModuleAvailable(name + '.index')
    //     if (is_available){
    //         return origin_require(name + '.index')
    //     }
    // }
    // return origin_require(name)
}

let MainLoop = require('MainLoop')
MainLoop.init()