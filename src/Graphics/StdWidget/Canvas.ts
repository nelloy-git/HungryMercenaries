import { graphics } from 'love'
import type { Canvas as LoveCanvas,
              CanvasSettings as LoveCanvasSettings,
              TextureType as LoveTextureType } from 'love.graphics'

import { PixelFormat as LovePixelFormat } from 'love.image'
import { Transform } from 'love.math'
import { Vec2 } from '../../Math'
import { Widget } from '../Widget'

import { Texture } from './Texture'

const newLoveCanvas = love.graphics.newCanvas
const DEFAULT_SIZE = new Vec2(1, 1)

export class Canvas extends Texture {

    constructor(pixel_size: Vec2 = DEFAULT_SIZE, settings: LoveCanvasSettings = {}){
        super()

        this.drawable = newLoveCanvas(pixel_size.x, pixel_size.y, settings)
    }

    release(){
        if (this.drawable){
            this.drawable.release()
        }
        
        super.release()
    }

    render(widget: Widget): void
    render(texture: Texture, transform?: Transform): void
    render(widget: Widget | Texture, transform?: Transform){
        graphics.setCanvas(this.drawable)
        if (transform){
            let texture = <Texture>widget
            graphics.draw(texture.drawable, transform)
        } else {
            widget.draw()
        }
        graphics.setCanvas()
    }

    drawable: LoveCanvas
}