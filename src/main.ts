import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window } from './Graphics'
import { Block } from './Graphics/World/Block'

let fps: Text

let img_data = new ImageData(new FileData('test.jpg'))
let img = love.graphics.newImage(img_data.data)

let block = new Block()

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.draw_size = new Vec2(100, 100)
    fps.level = 10000

    block.setSide('TOP', img)
    block.setSide('LEFT_FRONT', img)
    block.setSide('RIGHT_FRONT', img)
    block.update()
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    // world.update()
    // print('upd')
})

MainLoop.draw.add(() => {
    let [w, h] = Window.size.unpack()
    love.graphics.draw(block.canvas, w / 2, h / 2, 0, 1, 1)
    // graphics.draw(img)
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})