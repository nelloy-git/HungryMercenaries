import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Rect } from './Graphics'
import { Vec2 } from './Math'

let r: Rect
let v = new Vec2(10, 10)

MainLoop.load.add(() => {
    r = new Rect()
    r.size = new Vec2(100, 100)
})

MainLoop.update.add((dt) => {
    r.pos = r.pos.add(v.mult(dt))
})

MainLoop.actions.add('THREAD_ERR', () => {
    const data = <[any, string]> MainLoop.thread_error;

    print(data[1])
})