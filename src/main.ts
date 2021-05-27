import { Color, init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2, Vec3 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window } from './Graphics'
import { Block } from './Graphics/World/Block'
import { Rectangle } from './Graphics'

let fps: Text

let img_data = new ImageData(new FileData('test.jpg'))
let img = love.graphics.newImage(img_data.data)

let triag: Rectangle[] = []

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.draw_size = new Vec2(100, 100)
    fps.level = 10000

    let r = new Rectangle(new Vec3(0, 0, 0), new Vec3(0, 1, 0), new Vec3(1, 1, 0), new Vec3(1, 0, 0))
    triag.push(r)
    r.texture = img
    // r.pointsUV = [new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1)]
    r.update(new Vec3 (0, 0, 0))

    // t = new Rectangle(new Vec3(0, 0, 0), new Vec3(1, 1, 0), new Vec3(0, 1, 0))
    // triag.push(t)
    // t.texture = img
    // t.pointsUV = [new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1)]
    // t.update(new Vec3 (0, 0, 0))

})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
    

})

MainLoop.draw.add(() => {
    let [w, h] = Window.size.unpack()
    
    for (let i = 0; i < triag.length; i++){
        triag[i].draw(new Vec2(w / 2, h / 2))
    }
    
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})