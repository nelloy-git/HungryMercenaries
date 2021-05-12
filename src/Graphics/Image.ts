import { newImage, Image as LImage } from "love.graphics";

export class Image{
    constructor(path: string){
        this.__love_img = newImage(path)
    }

    private readonly __love_img: LImage
}