import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { Image, Text, Window } from './Graphics'

let fps: Text
let test: Image[] = []

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED

    fps = new Text('Raleway-Regular.ttf')
    for (let i = 0; i < 100; i++){
        let im = new Image('test.jpg')
        test.push(im)

        im.pos = new Vec2(100 + 10 * i, 100 + 10 * i)
        im.shear = new Vec2(1, 0)
    }
})

MainLoop.update.add((dt) => {
    fps.drawable.set(string.format('%.1f', 1 / dt))
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})