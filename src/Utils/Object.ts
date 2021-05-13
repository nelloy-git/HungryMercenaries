
export abstract class Object {
    constructor(){
        this.id = Object.__next_id++
    }

    toString(){
        return this.constructor.name + '<' + this.id + '>'
    }

    abstract destroy(): void

    readonly id: number

    private static __next_id = 0
}