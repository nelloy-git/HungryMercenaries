import type { BlendMode, Drawable, Shader } from 'love.graphics'

import { Vec2 } from '../Math'
import { Color, Object } from '../Utils'

import { Layers } from './Layers'

export abstract class Widget extends Object {
    constructor(){
        super()

        this.pos = new Vec2(0, 0)

        this.__level = 0
        this.__parent = undefined
        this.__children = []
        
        Layers.add(this)
    }

    destroy(){
        Layers.remove(this)
    }

    abstract draw(): void

    get abs_pos(){
        let parent_pos = this.__parent ? this.__parent.pos : new Vec2(0, 0)
        return parent_pos.add(this.pos)
    }

    get level(){return this.__level}
    set level(level: number){
        Layers.remove(this)
        this.__level = level
        Layers.add(this, level)
    }

    get parent(){return this.__parent}
    set parent(p: Widget | undefined){
        if (this.__parent){
            this.__parent.__children.splice(this.__parent.__children.indexOf(this))
        }

        this.__parent = p
        if (p){
            p.__children.push(this)
        }
    }
    get children(){return this.__children as ReadonlyArray<Widget>}

    pos: Vec2
    abstract draw_size: Vec2

    private __level: number
    private __parent: Widget | undefined
    private __children: Widget[]
}