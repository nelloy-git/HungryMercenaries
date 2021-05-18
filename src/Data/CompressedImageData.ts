import type { CompressedImageData as LoveCompressedImageData } from 'love.image'
import { Vec2 } from '../Math'

import { Data } from './Data'
import { FileData } from './FileData'

const newLoveCompressedImageData = love.image.newCompressedData

export class CompressedImageData extends Data {
    constructor(file: FileData){
        super()
        this.data = newLoveCompressedImageData(file.data)
    }

    release(){
        this.data.release()
    }

    /**
     * Width and height of the CompressedImageData.
     *
     * @link [CompressedImageData:getDimensions](https://love2d.org/wiki/CompressedImageData:getDimensions)
     */
    get dimentions(){
        let [w, h] = this.data.getDimensions()
        return new Vec2(w, h) 
    }

    /**
     * Gets the format of the CompressedImageData.
     *
     * @link [CompressedImageData:getFormat](https://love2d.org/wiki/CompressedImageData:getFormat)
     */
    get format(){
        return this.data.getFormat()
    }

    /**
     * Gets the number of mipmap levels in the CompressedImageData. The base mipmap
     * level (original image) is included in the count.
     *
     * @link [CompressedImageData:getMipmapCount](https://love2d.org/wiki/CompressedImageData:getMipmapCount)
     */
    get mipmap_count(){
        return this.data.getMipmapCount()
    }

    data: LoveCompressedImageData
}