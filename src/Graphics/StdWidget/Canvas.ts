import type { Canvas as LoveCanvas, CanvasSettings as LoveCanvasSettings } from 'love.graphics'
import { Vec2 } from '../../Math'

import { Texture } from './Texture'

const newLoveCanvas = love.graphics.newCanvas

export class Canvas extends Texture {

    constructor(data_size: Vec2, options: LoveCanvasSettings){
        super()

        this._drawable = newLoveCanvas(data_size.x, data_size.y, )
    }

    destroy(){
        if (this._drawable){
            this._drawable.release()
        }
        
        super.destroy()
    }

    protected _drawable: LoveCanvas
}