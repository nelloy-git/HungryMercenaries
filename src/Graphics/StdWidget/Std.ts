import type { Shader as LoveShader, Drawable as LoveDrawable, BlendMode, Shader } from 'love.graphics'
import { Vec2 } from '../../Math'
import { Color } from '../../Utils'

import { Widget } from '../Widget'

const graphics = love.graphics

export abstract class StdWidget extends Widget {

    constructor(){
        super()

        this.draw_size = new Vec2(0, 0)
        this.angle = 0
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
                this.draw_size.x / this.pixel_size.x, this.draw_size.y / this.pixel_size.y,
                this.origin.x, this.origin.y,
                this.shear.x, this.shear.y
            )
        }
    }

    draw_size: Vec2
    angle: number
    visible: boolean
    color: Color
    blend: BlendMode
    shader: Shader | undefined
    origin: Vec2
    shear: Vec2

    readonly abstract pixel_size: Vec2
    
    protected abstract _drawable: LoveDrawable
}