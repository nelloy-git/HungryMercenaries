import type { Shader as LoveShader, Drawable as LoveDrawable, BlendMode, Shader } from 'love.graphics'
import { Vec2 } from '../../Math'
import { Color } from '../../Utils'

import { Widget } from '../Widget'

const graphics = love.graphics

export abstract class StdWidget extends Widget {

    constructor(){
        super()

        this.angle = 0
        this.size = new Vec2(1, 1)
        this.visible = true
        this.color = new Color()
        this.blend = 'alpha'
        this.shader = undefined
        this.origin = new Vec2(0, 0)
        this.shear = new Vec2(0, 0)
    }
    
    draw(){
        if (this.visible){
            graphics.setColor(this.color.unpack())
            graphics.setBlendMode(this.blend)
            graphics.setShader(<LoveShader>this.shader)
            graphics.draw(
                this._drawable,
                this.abs_pos.x, this.abs_pos.y,
                this.angle,
                this.size.x, this.size.y,
                this.origin.x, this.origin.y,
                this.shear.x, this.shear.y
            )
        }
    }

    angle: number
    size: Vec2
    visible: boolean
    color: Color
    blend: BlendMode
    shader: Shader | undefined
    origin: Vec2
    shear: Vec2
    
    protected abstract _drawable: LoveDrawable
}