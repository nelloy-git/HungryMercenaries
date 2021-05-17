import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { FileData, ImageData } from './Data'
import { Image, Text, Window, World } from './Graphics'
import { Block } from './Graphics/World/Block'

let fps: Text
let test: Image[] = []

MainLoop.load.add(() => {
    Window.vsync = Window.VSync.DISABLED
    fps = new Text()
    fps.level = 10000

    let world = new World(new Vec2(150,150))
    for (const block of world.sub){
        // (<Block>block).drawFrontLeft = () => {love.graphics.d}
    }
})

MainLoop.update.add((dt) => {
    fps.text = string.format('%.1f', 1 / dt)
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})