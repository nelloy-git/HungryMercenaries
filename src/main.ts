import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window, World } from './Graphics'
import { Block } from './Graphics/World/Block'
import { Canvas } from './Graphics/StdWidget/Canvas'

let fps: Text
let test: Image[] = []
// let world = new World(new Vec2(640, 480), 400)

let img_data = new ImageData(new FileData('test.jpg'))



MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.draw_size = new Vec2(100, 100)
    fps.level = 10000

    let block = new Block(new Vec2(100, 100))
    block.draw_size = new Vec2(100, 100)
    block.pos = Window.size.mult(0.5).sub(block.draw_size.mult(0.5))
    print(Window.size, block.pos)

    let left = new Image(img_data)
    left.draw_size = new Vec2(50, 50)
    left.parent = block

    let right = new Image(img_data)
    right.draw_size = new Vec2(50, 50)
    right.parent = block

    let top = new Image(img_data)
    top.draw_size = new Vec2(50, 50)
    top.parent = block

    block.drawFrontLeft = () => {    
        let size = block.draw_size
        
        left.angle = 0
        left.pos = new Vec2(0, 0.25 * size.y)
        left.draw_size = new Vec2(0.5 * size.x, 0.5 * size.y)
        left.shear = new Vec2(0, 0.5)
        left.draw()
    }

    block.drawFrontRight = () => {
        let size = block.draw_size

        right.angle = 0
        right.pos = new Vec2(0.5 * size.x, 0.5 * size.y)
        right.draw_size = new Vec2(0.5 * size.x, 0.5 * size.y)
        right.shear = new Vec2(0, -0.5)
        right.draw()
    }

    block.drawTop = () => {
        let size = block.draw_size

        top.angle = math.pi / 4
        top.pos = new Vec2(0.5 * size.x, 0)
        top.draw_size = new Vec2(size.x, 0.25 * size.y)
        top.origin = top.draw_size.mult(0.5)
        top.draw()
    }

    // world.draw_size = new Vec2(640, 480)
    // world.pos = Window.size.mult(0.5)
    // for (const block of world.sub){
    //     let img = new Image(img_data)
    //     img.draw_size = new Vec2(50, 50);
    //     img.parent = block;
    //     (<Block>block).drawFrontLeft = () => {
    //         img.shear = new Vec2(0, -0.5)
    //         img.draw()
    //     }
    // }
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    // world.update()
    // print('upd')
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})