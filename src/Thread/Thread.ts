import { Thread as LoveThread, Channel } from 'love.thread'

export class Thread<Args extends any[] = [], Res = void> {
    constructor(){
        this.id = Thread.__next_id++
        this.__ready = false
        this.__running = false

        this.__thread = love.thread.newThread(Thread.__thread_func)
        this.__channel = love.thread.getChannel(this.toString())
    }

    toString(){
        return this.constructor.name + '<' + this.id + '>'
    }

    get func(){return this.__func}
    set func(f: ((...args: Args) => Res) | undefined){
        this.__func = f
    }

    get ready(){
        this.__update()
        return this.__ready
    }

    get running(){
        this.__update()
        return this.__running
    }

    get result(){
        this.__update()
        return this.__res
    }

    start(...args: Args){
        this.__ready = false
        this.__running = true
        this.__res = undefined
        if (!this.__func){
            throw this.toString() + ': can not start. Thread function is undefined.'
        }

        let s_func = string.dump(this.__func)
        this.__thread.start(this.toString(), s_func, args)
    }

    join(){
        this.__thread.wait()
        this.__update()
    }

    private __update(){
        let running = this.__thread.isRunning()

        if (!running && !this.__ready && this.__channel.getCount() != 0){
            this.__ready = true
            this.__res = <Res>this.__channel.pop()
        }
    }

    readonly id: number

    private __func: ((...args: Args) => Res) | undefined
    private __ready: boolean
    private __running: boolean
    private __res: Res | undefined

    private __thread: LoveThread
    private __channel: Channel


    private static __next_id = 0
    private static __thread_func = 
        'local __thread = require("love.thread")\n' +
        'local __argv = {...}\n' +
        'local __s_this = table.remove(__argv, 1)\n' + 
        'local __s_func = table.remove(__argv, 1)\n' + 
        'local __channel = __thread.getChannel(__s_this)\n' +
        'local func = loadstring(__s_func)\n' +
        'local res = func(unpack(__argv[1]))\n' +
        '__channel:push(res)'
}