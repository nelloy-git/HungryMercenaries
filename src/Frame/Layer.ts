import type { Drawable } from './Drawable'

// TODO threading

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
        for (let i = 0; i < this.__list.length; i++){
            this.__list[i].draw()
        }
    }

    private __list: Drawable[]
}