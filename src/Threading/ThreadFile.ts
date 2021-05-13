import { Thread } from "./Thread";
import { ThreadData } from "./Utils";

export class ThreadFile<T extends ThreadData[]> extends Thread<T> {
    constructor(file: ThreadFile.Input<T>){
        super(ThreadFile.__wraper)

        this.__file = file
    }

    start(...args: T){
        this._thread.start(this.__file.name, ...args)
    }

    private __file: ThreadFile.Input<T>

    private static __wraper = 
        'local __argv__ = {...}\n' + 
        'local __name__ = table.remove(__argv__, 1)\n' + 
        'local __main__ = require(__name__)\n' + 
        '__main__.init(unpack(__argv__))\n'
}

export namespace ThreadFile {
    export interface Input<Args extends ThreadData[] = []> {
        init(...args: Args): void
        readonly name: string
    }
}
