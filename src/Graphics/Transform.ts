import type { Transform as LoveTransform } from 'love.math'
import { Vec2 } from '../Math';

import { Object } from "../Utils";

const newLoveTransform = love.math.newTransform

export class Transform extends Object {
    constructor(){
        super()

        this.transform = newLoveTransform()
    }

    destroy(){
        this.transform.release()
    }

    reset(){
        this.transform.reset()
    }

    rotate(angle: number){
        this.transform.rotate(angle)
    }

    scale(v: Vec2){
        this.transform.scale(v.x, v.y)
    }

    shear(v: Vec2){
        this.transform.shear(v.x, v.y)
    }

    readonly transform: LoveTransform
}