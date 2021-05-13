export function getPath(){
    let data = debug.getinfo(2, "S")

    if (!data){
        throw 'debug.getinfo(1, "S") is undefined'
    }

    let src = data.source
    if (!src){
        throw 'debug.getinfo(1, "S").source is undefined'
    }

    return string.sub(src, 2)
}

export function getDir(){
    let data = debug.getinfo(2, "S")

    if (!data){
        throw 'debug.getinfo(1, "S") is undefined'
    }

    let src = data.source
    if (!src){
        throw 'debug.getinfo(1, "S").source is undefined'
    }
    
    src = string.sub(src, 2)
    let [pos] = string.find(src, "/[^/]*$")
    return string.sub(src, 1, pos - 1)
}

export function getModule(){
    let data = debug.getinfo(2, "S")

    if (!data){
        throw 'debug.getinfo(1, "S") is undefined'
    }

    let src = data.source
    if (!src){
        throw 'debug.getinfo(1, "S").source is undefined'
    }
    
    src = string.sub(src, 2, src.length - 4)
    return src.replace('/', '.')
}