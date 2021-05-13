import { init } from './Utils/index'
init()

import { Canvas} from 'love.graphics'
import { MainLoop } from './Base'
import { Vec2 } from './Math'

import { Screen, Data } from './Graphics/index'
// import { Data } from './Graphics/Layer/ThreadedDraw'

Screen.init()

let test: Canvas[] = []

MainLoop.load.add(() => {
    for (let i = 0; i < 100; i++){
        let img = love.graphics.newCanvas(100, 100)
        test.push(img)

        love.graphics.setCanvas(img)
        let c = 0.01 * (100 - i)
        love.graphics.setColor(c, c, c)
        love.graphics.rectangle('fill', 0, 0, 100, 100)
    }
	love.graphics.setCanvas()

    print('Loaded')

    for (let i = 0; i < test.length; i++){
        let canv = test[i]

        let data: Data = {
            obj: canv,
            x: i * 10,
            y: i * 10,
        }

        Screen.add(Math.floor(i / 10), data)
    }

    print('Loaded')
})

MainLoop.update.add((dt) => {
})

MainLoop.thread_error.add((th, err) => {
    print(err)
})