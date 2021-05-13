// import { graphics } from "love";
import type { Canvas } from "love.graphics";
import { MainLoop } from "../../Base";
import { Channel, getCoresCount, ThreadFile } from "../../Threading";

const graphics = love.graphics

import * as Drawer from './ThreadedDraw'
const DrawerFile: ThreadFile.Input<[string]> = Drawer 
const WORKERS = getCoresCount()

type Layer = Drawer.Data[]

export class Screen {

    static init(this: void){
        Screen.__workers = []
        Screen.__inputs = []
        for (let i = 0; i < WORKERS; i++){
            let worker = new ThreadFile(DrawerFile)
            Screen.__workers.push(worker)

            let input_ch = 'ScreenWorker_' + i
            let input = new Channel<Drawer.Data>(input_ch)
            Screen.__inputs.push(input)

            worker.start(input_ch)
        }
    }

    static draw(this: void){
        for (const [level, [canvas, layer]] of Screen.__layers){
            let found = false
            
            while (!found){
                for (let i = 0; i < Screen.__workers.length; i++){
                    if (Screen.__inputs[i].length == 0){
                        found = true
                        Screen.__pushDrawing(Screen.__inputs[i], layer)
                        break
                    }
                }
            } 
        }

        let finished = false
        while (!finished){
            for (let i = 0; i < Screen.__inputs.length; i++){
                finished = finished && (Screen.__inputs[i].length == 0)
            }
        }

        for (const [level, [canvas, layer]] of Screen.__layers){
            love.graphics.setCanvas()
            graphics.draw(canvas)
        }
    }

    static add(this: void, level: number, data: Drawer.Data){
        let layer = Screen.__layers.get(level)
        if (!layer){
            layer = [graphics.newCanvas(), []]
            Screen.__layers.set(level, layer)
            Screen.__layers = new Map([...Screen.__layers.entries()].sort((a, b) => {return a[0] - b[0]}))
        }

        layer[1].push(data)
    }

    private static __pushDrawing(input: Channel<Drawer.Data>, layer: Layer){
        for (let i = 0; i < layer.length; i++){
            input.push(layer[i])
        }
    }

    private static __workers: ThreadFile<[string]>[]
    private static __inputs: Channel<Drawer.Data>[]

    private static __layers = new Map<number, [Canvas, Layer]>([
        [0, [graphics.newCanvas(), []]]
    ])
}

MainLoop.draw.add(Screen.draw)