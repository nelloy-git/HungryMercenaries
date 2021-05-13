import type { BlendMode, Drawable, Shader } from 'love.graphics'

import { Vec2 } from '../Math'
import { Color, Object } from '../Utils'

import { Layers } from './Layers'

export abstract class Widget extends Object {
    constructor(){
        super()

        this.pos = new Vec2(0, 0)
        this.angle = 0
        this.size = new Vec2(1, 1)
        this.visible = true
        this.color = new Color()
        this.blend = 'alpha'
        this.shader = undefined
        this.origin = new Vec2(0, 0)
        this.shear = new Vec2(0, 0)

        this.__level = 0
        this.__parent = undefined
        this.__children = []
        
        Layers.add(this)
    }

    destroy(){
        Layers.remove(this)
    }

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

    abstract drawable: Drawable
    pos: Vec2
    angle: number
    size: Vec2
    visible: boolean
    color: Color
    blend: BlendMode
    shader: Shader | undefined
    origin: Vec2
    shear: Vec2

    private __level: number
    private __parent: Widget | undefined
    private __children: Widget[]
}