import { Vec2 } from '../../Math';
import { Object } from '../../Utils';
import { Compositor } from '../Compositor';
// import { Widget } from '../Widget';

const HEIGHT = 50
const WIDTH = 50

type Side = 'BOT' | 'REAR_LEFT' | 'READ_RIGHT' | 'FRONT_LEFT' | 'FRONT_RIGHT' | 'TOP'

function newCompositor(side: Side){
    let comp = new Compositor(WIDTH, HEIGHT)
    comp.transform = love.math.newTransform()

    if (side == 'BOT' || side == 'TOP'){
        comp.transform.translate(WIDTH / 2, 0)
        comp.transform.scale()
        comp.transform.rotate(math.pi / 2)
        comp.transform.scale(1, 0.5)
    } else if (side == 'FRONT_LEFT' || side == 'REAR_LEFT'){
        comp.transform.shear(0, -0.5)
    } else {
        comp.transform.shear(0, 0.5)
    }
    
    return comp
}

export class Block extends Compositor {

    constructor(){
        super()

        this.draw_size = pixel_size.copy()
    }

    draw(){
    }

    drawBottom: (() => void) | undefined
    drawBackLeft: (() => void) | undefined
    drawBackRight: (() => void) | undefined
    drawInside: (() => void) | undefined
    drawFrontLeft: (() => void) | undefined
    drawFrontRight: (() => void) | undefined
    drawTop: (() => void) | undefined

    draw_size: Vec2

    private static __compositors: Record<Side, Compositor> = {
        BOT: newCompositor('BOT'),
        REAR_LEFT: newCompositor('REAR_LEFT'),
        READ_RIGHT: newCompositor('READ_RIGHT'),
        FRONT_LEFT: newCompositor('FRONT_LEFT'),
        FRONT_RIGHT: newCompositor('FRONT_RIGHT'),
        TOP: newCompositor('TOP'),
    }
}