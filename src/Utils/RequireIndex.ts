const origin_require = _G.require
export function requireIndex(name: string){
    let [success, module] = pcall(origin_require, name)
    if (!success){
        let err = <string>module

        if (!err.startsWith('module')){
            throw err
        }

        [success, module] = pcall(origin_require, name + '.index')
        if (!success){
            let err = <string>module
            throw err
        }
    }

    return module
}