import { FileData } from 'love.filesystem'
import { Thread as LoveThread, newThread as newLoveThread } from 'love.thread'

import { Object } from '../Utils'
import { ThreadData } from './Utils'

export class Thread<Args extends ThreadData[] = []> extends Object {

    constructor(func: ((this: void, ...args: Args) => void))
    constructor(codestr: string)
    constructor(filename: string)
    constructor(filedata: FileData)
    constructor(data: string | FileData | ((this:void, ...args: Args) => void)){
        super()
        if (typeof data == 'function'){
            data = string.dump(data)
        }
        this._thread = newLoveThread(<string>data)
    }

    destroy(){
        this._thread.release()
    }

    start(...args: Args){
        this._thread.start(...args)
    }

    join(){
        this._thread.wait()
    }

    get error(){
        return this._thread.getError()
    }

    get running(){
        return this._thread.isRunning()
    }

    protected _thread: LoveThread
}