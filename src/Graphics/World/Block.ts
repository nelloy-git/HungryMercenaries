import { Widget } from '../Widget';

export class Block extends Widget {

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
}