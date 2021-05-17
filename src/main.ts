import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window } from './Graphics'

let fps: Text
let test: Image[] = []

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.level = 10000

    for (let i = 0; i < 100; i++){
        let data = new ImageData(new FileData('test.jpg'))
        let im = new Image(data)
        test.push(im)

        im.pos = new Vec2(100 + 1 * i, 100 + 1 * i)
        im.shear = new Vec2(0, 0)
    }
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})