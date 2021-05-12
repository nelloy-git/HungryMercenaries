import type { Drawable } from './Drawable'

export class Layer {
    constructor(){
        this.__list = []
    }

    get length(){
        return this.__list.length
    }

    push(obj: Drawable){
        this.__list.push(obj)
    }

    indexOf(obj: Drawable){
        return this.__list.indexOf(obj)
    }

    splice(pos: number){
        this.__list.splice(pos)
    }

    draw(){
        for (const obj of this.__list){
            obj.draw()
        }
    }

    private __list: Drawable[]
}