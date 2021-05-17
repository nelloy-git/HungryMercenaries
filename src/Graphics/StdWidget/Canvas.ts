import type { Canvas as LoveCanvas,
              CanvasSettings as LoveCanvasSettings,
              TextureType as LoveTextureType } from 'love.graphics'
import { PixelFormat as LovePixelFormat } from 'love.image'
import { Vec2 } from '../../Math'
import { Widget } from '../Widget'

import { Texture } from './Texture'

const newLoveCanvas = love.graphics.newCanvas
const DEFAULT_SIZE = new Vec2(1, 1)

export class Canvas extends Texture {

    constructor(pixel_size: Vec2 = DEFAULT_SIZE){
        super()

        this.sub = []
        this._pixel_size = pixel_size.copy()
        this._settings = {}
        this._drawable = newLoveCanvas(DEFAULT_SIZE.x, DEFAULT_SIZE.y, this._settings)
    }

    destroy(){
        if (this._drawable){
            this._drawable.release()
        }
        
        super.destroy()
    }

    update(){
        love.graphics.setCanvas(this._drawable)
        for (let widget of this.sub){
            widget.draw()
        }
        love.graphics.setCanvas()
    }

    get pixel_size(){
        return this._pixel_size.copy()
    }

    set pixel_size(s: Vec2){
        this._pixel_size = s.copy()
        this._drawable = newLoveCanvas(s.x, s.y, this._settings)
        this.update()
    }

    set texture_type(t: LoveTextureType){
        this._settings.type = t
        this._drawable = newLoveCanvas(this._pixel_size.x, this._pixel_size.y, this._settings)
        this.update()
    }

    set pixel_format(f: LovePixelFormat){
        this._settings.format = f
        this._drawable = newLoveCanvas(this._pixel_size.x, this._pixel_size.y, this._settings)
        this.update()
    }

    set dpi_scale(scale: number){
        this._settings.dpiscale = scale
        this._drawable = newLoveCanvas(this._pixel_size.x, this._pixel_size.y, this._settings)
        this.update()
    }

    readonly sub: Widget[]

    protected _drawable: LoveCanvas
    protected _settings: LoveCanvasSettings

    protected _pixel_size: Vec2
}