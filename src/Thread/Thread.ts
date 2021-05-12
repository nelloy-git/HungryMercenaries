import { Thread as LoveThread } from 'love.thread'

export class Thread {
    constructor(){
        this.__love_thread = love.thread.newThread(Thread.__thread_func)
    }

    run<Args extends any[], Res>(func: (...args: Args) => Res, ...args: Args){
        let s_func = string.dump(func)
        this.__love_thread.start(s_func, args)
    }

    private __love_thread: LoveThread

    private static __thread_func = 
        'local argv = {...}\n' +
        'local s_func = table.remove(argv, 1)\n' + 
        'local func = loadstring(s_func)' +
        'return func(argv)'
}