// import { graphics } from 'love'
import type { Canvas, Drawable } from 'love.graphics'
import { Channel } from '../../Threading'
import { getModule } from '../../Utils'

export const name = getModule()
export type Data = {
    obj: Drawable,
    x?: number,
    y?: number,
    rot?: number,
    sx?: number,
    sy?: number,
    ox?: number,
    oy?: number,
    kx?: number,
    ky?: number
}

export function init(input_ch: string){
    const input = new Channel<[Canvas, Data]>(input_ch)

    while (true){
        let [canvas, data] = input.demand()
        love.graphics.setCanvas(canvas)
        love.graphics.draw(
            data.obj,
            data.x,
            data.y,
            data.rot,
            data.sx,
            data.sy,
            data.ox,
            data.oy,
            data.kx,
            data.ky
        )
        love.graphics.setCanvas()
    }
}