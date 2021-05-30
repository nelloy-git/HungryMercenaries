import { Color, init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2, Vec3 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window } from './Graphics'
import { Rectangle, Block } from './Graphics'
import { IsometricGrid } from './Graphics/3d/IsometricGrid'

let fps: Text

let img_test = new ImageData(new FileData('test.jpg'))
let img_top = new ImageData(new FileData('Resources/Textures/Land/TexturesCom_Grass0005_1_seamless_S.jpg'))
let img_side = new ImageData(new FileData('Resources/Textures/Land/TexturesCom_Grass0118_1_seamless_S.jpg'))

let test = love.graphics.newImage(img_test.data)
let top = love.graphics.newImage(img_top.data)
let side = love.graphics.newImage(img_side.data)

let grid: IsometricGrid = new IsometricGrid(16)
let blocks: Block[] = []
let rects: Rectangle[] = []

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.draw_size = new Vec2(100, 100)
    fps.level = 10000

    for (let i = 0; i < 1; i++){
        let block = new Block(128)
        blocks.push(block)

        block.sides.LEFT.texture = side
        block.sides.RIGHT.texture = side
        block.sides.TOP.texture = top
        block.update()

        // let rect = new Rectangle(
        //     new Vec3(0, 1, 1),
        //     new Vec3(0, 1, 0),
        //     new Vec3(1, 1, 0),
        //     new Vec3(1, 1, 1)
        // )
        // rects.push(rect)
        // rect.texture = img
        // rect.update()
    }
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    

})

MainLoop.draw.add(() => {
    let [w, h] = Window.size.unpack()
    
    grid.step += 0.01
    grid.origin = Window.size.mult(0.5)

    for (let i = 0; i < 5; i++){
        blocks[0].draw(grid, new Vec3(i, 0, 0))

        // rects[0].draw(grid, new Vec3(i, -1, 1))
    }


    
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})