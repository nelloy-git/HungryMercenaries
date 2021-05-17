import { Vec2 } from '../../Math';
import { Widget } from '../Widget';

const DEFAULT_SIZE = new Vec2(100, 100)

export class Block extends Widget {

    constructor(pixel_size: Vec2 = DEFAULT_SIZE){
        super()

        this.draw_size = pixel_size.copy()
    }

    draw(){
        if (this.drawBottom){this.drawBottom()}
        if (this.drawBackLeft){this.drawBackLeft()}
        if (this.drawBackRight){this.drawBackRight()}
        if (this.drawInside){this.drawInside()}
        if (this.drawFrontLeft){this.drawFrontLeft()}
        if (this.drawFrontRight){this.drawFrontRight()}
        if (this.drawTop){this.drawTop()}
    }

    drawBottom: (() => void) | undefined
    drawBackLeft: (() => void) | undefined
    drawBackRight: (() => void) | undefined
    drawInside: (() => void) | undefined
    drawFrontLeft: (() => void) | undefined
    drawFrontRight: (() => void) | undefined
    drawTop: (() => void) | undefined

    draw_size: Vec2
}