export class Action<Args extends any[] = [], Out = void> {

    constructor(callback: (this: void, ...args: Args) => Out,
                header?: string){
        this.header = header ? header : '<Empty>'
        this.__callback = callback
    }

    toString(){
        return this.header + '.' + this.constructor.name
    }

    run(...args: Args): Out{
        let res
        if (!Action.__inside_xpcall) {
            Action.__inside_xpcall = true
            let success
            [success, res] = xpcall(() => {this.__callback(...args)}, (err) => {
                print('{ERROR} ' + os.date("%m/%d/%Y %I:%M %p") + '\n\t'
                        + this.toString() + ': ' + err + '\n' +
                        debug.traceback())
            })

            if (!success){
                this.__callback = () => {return <Out><unknown>undefined}
            }

            Action.__inside_xpcall = false
        } else {
            res = this.__callback(...args)
        }

        return res as Out
    }

    readonly header: string
    private __callback: (this: void, ...args: Args) => Out
    
    private static __inside_xpcall = false
}