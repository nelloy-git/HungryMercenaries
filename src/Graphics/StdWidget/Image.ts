import type { Image as LoveImage } from 'love.graphics'

import { ImageData, CompressedImageData } from '../../Data'
import { Texture } from './Texture'

const newLoveImage = love.graphics.newImage

export class Image extends Texture {

    constructor(img_data: ImageData | CompressedImageData){
        super()

        this.__data = img_data
        this.drawable = newLoveImage(<any>img_data.data)
    }

    release(){
        if (this.drawable){
            this.drawable.release()
        }
        
        super.release()
    }

    get data(){return this.__data}
    set data(data: ImageData | CompressedImageData){
        this.__data = data
        this.drawable.release()
        
        this.drawable = newLoveImage(<any>data.data)
    }

    drawable: LoveImage

    private __data: ImageData | CompressedImageData
}