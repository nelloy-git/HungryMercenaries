import { Action } from './Action'

export class ActionList<Args extends any[] = []> {
    constructor(header?: string){
        this.header = header
        this.__actions = []
        this.__linked = new Map()
    }

    toString(){
        return this.header + '.' + this.constructor.name
    }

    get length(){
        return this.__actions.length
    }

    run(...args: Args){
        for (let i = 0; i < this.__actions.length; i++){
            if (!this.__actions[i]){
                return
            }
            this.__actions[i].run(...args)
        }
    }

    add(action: Action<Args>): Action<Args>
    add(callback: (this: void, ...args: Args) => void): Action<Args>
    add(action_or_callback: Action<Args> | ((this: void, ...args: Args) => void)): Action<Args>
    add(action_or_callback: Action<Args> | ((this: void, ...args: Args) => void)){
        let action: Action<Args>
        if (typeof action_or_callback === 'function'){
            action = new Action<Args>(action_or_callback, this.header)
        } else {
            action = action_or_callback
        }
        this.__actions.push(action)
        return action
    }

    remove(act: Action<Args> | undefined){
        if (!act){
            return false
        }

        let pos = this.__actions.indexOf(act)
        if (pos >= 0){
            this.__actions.splice(pos, 1)
        }
        return pos >= 0
    }

    link<LinkedArgs extends any[]>(convert: (...args: LinkedArgs) => Args, provider: ActionList<LinkedArgs>){
        if (this.__linked.get(provider)){
            error(this.toString() + ': can not link actions. Already linked.')
        }

        const act = provider.add((...args) => {this.run(...convert(...args))})
        this.__linked.set(provider, act)
    }

    unlink<LinkedArgs extends any[]>(provider: ActionList<LinkedArgs>){
        if (!this.__linked.get(provider)){
            return false
        }
        this.__linked.delete(provider)
        return true
    }

    readonly header: string | undefined
    
    private __actions: Action<Args>[]
    private __linked: Map<ActionList<any>, Action<any, void>>

}