import { rectangle as rect } from 'love.graphics'
import { Drawable } from './Drawable'

export class Rect extends Drawable {

    constructor(){
        super()
        this.__filled = false
    }

    get filled(){return this.__filled}
    set filled(f: boolean){this.__filled = f}

    draw(){
        let abs_pos = this.abs_pos
        let size = this.size
        rect(this.__filled ? 'fill' : 'line', abs_pos.x, abs_pos.y, size.x, size.y)
    }

    private __filled: boolean
}