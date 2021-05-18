import type { Shader } from 'love.graphics'
import { MainLoop } from '../Base'

import type { Widget } from './Widget'
import { Window } from './Window'

const graphics = love.graphics

export class Layers {

    static add(this: void, widget: Widget, level: number = 0){
        Layers.__getLayer(level).push(widget)
    }

    static remove(this: void, widget: Widget){
        for (const [level, layer] of Layers.__list){
            let pos = layer.indexOf(widget)
            if (pos >= 0){
                layer.splice(pos)
                break
            }
        }
    }

    static draw(this: void, ){
        for (const [level, layer] of Layers.__list){
            for (let i = 0; i < layer.length; i++){
                layer[i].draw()
            }
        }
    }

    private static __getLayer(this: void, level: number){
        let layer = Layers.__list.get(level)
        if (!layer){
            layer = []
            Layers.__list.set(level, layer)
            Layers.__list = new Map([...Layers.__list.entries()].sort((a, b) => {return a[0] - b[0]}))
        }
        return layer
    }

    // private static __drawWidget(this: void, widget: Widget){
    //     if (widget.visible){
    //         graphics.setColor(widget.color.unpack())
    //         graphics.setBlendMode(widget.blend)
    //         graphics.setShader(<Shader>widget.shader)
    //         graphics.draw(
    //             widget.drawable,
    //             widget.abs_pos.x, widget.abs_pos.y,
    //             widget.angle,
    //             widget.size.x, widget.size.y,
    //             widget.origin.x, widget.origin.y,
    //             widget.shear.x, widget.shear.y
    //         )
    //     }
    // }

    private constructor(){}
    private static __list = new Map<number, Widget[]>([])
}

MainLoop.draw.add(Layers.draw)