import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window } from './Graphics'
// import { Block } from './Graphics/World/Block'
import { Canvas } from './Graphics/StdWidget/Canvas'
import { Compositor } from './Graphics/Compositor'
import { graphics } from 'love'

let fps: Text
let test: Image[] = []
// let world = new World(new Vec2(640, 480), 400)

let comp = new Compositor(500, 500)
let img_data = new ImageData(new FileData('test.jpg'))

let img = love.graphics.newImage(img_data.data)

// comp.canvas.renderTo(() => {
//     graphics.draw(img, 0, 0, 0, 1, 1, 0, 0, 0, 0)
// })


MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.draw_size = new Vec2(100, 100)
    fps.level = 10000

    // print(comp.canvas.getWidth(), 'x', comp.canvas.getHeight())

    comp.transform = love.math.newTransform()
    comp.transform.translate(200, 0)
    comp.transform.scale(1, 0.5)
    comp.transform.rotate(math.pi / 4)

    comp.drawDrawable(img)
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    // world.update()
    // print('upd')
})

MainLoop.draw.add(() => {
    graphics.draw(comp.canvas)
    // graphics.draw(img)
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})