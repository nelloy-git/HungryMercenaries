import type { ImageData as LoveImageData } from 'love.image'
import { Vec2 } from '../Math'

import { Data } from './Data'
import { FileData } from './FileData'

const newLoveImageData = love.image.newImageData

export class ImageData extends Data {
    constructor(file: FileData){
        super()
        this.data = newLoveImageData(file.data)
    }

    release(){
        this.data.release()
    }

    data: LoveImageData
}