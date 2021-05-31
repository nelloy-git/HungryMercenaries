import { Color, init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2, Vec3 } from './Math'

import { FileData, ImageData } from './Data'
import * as Graphics from './Graphics'
import { ProtoBlock, DrawBase, Text, Window, World } from './Graphics'

for (let k in Graphics){
    print(k)
}

let fps: Text
let world: World

let img_top = new ImageData(new FileData('Resources/Textures/Land/TexturesCom_Grass0005_1_seamless_S.jpg'))
let img_side = new ImageData(new FileData('Resources/Textures/Land/TexturesCom_Grass0118_1_seamless_S.jpg'))

let top = love.graphics.newImage(img_top.data)
let side = love.graphics.newImage(img_side.data)

let block = new ProtoBlock(128)

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    // Window.fullscreen = true

    fps = new Text(new Vec2(0, 0), new Vec2(100, 100))
    fps.level = 10000

    world = new World(new Vec2(100, 0), new Vec2(640, 480))
    
    block.sides.LEFT.texture = side
    block.sides.RIGHT.texture = side
    block.sides.TOP.texture = top
    block.update()

    for (let i = 0; i < 20; i++){
        for (let j = 0; j < 20; j++){
            for (let k = 0; k < 10; k++){
                let b = new DrawBase(block)
                world.objects.push(b)
    
                b.pos = new Vec3(i, j, k)
            }
        }
    }
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    world.grid.step += 0.1
})

MainLoop.draw.add(() => {
    let [w, h] = Window.size.unpack()
    world.draw()
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})