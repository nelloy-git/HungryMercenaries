import type { Image as LoveImage } from 'love.graphics'

import { Widget } from './Widget'

const newImage = love.graphics.newImage

export class Image extends Widget {

    constructor(path: string){
        super()
        this.drawable = newImage(path)
    }

    drawable: LoveImage
}