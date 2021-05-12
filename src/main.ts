import { init } from './Utils/index'
init()

import { MainLoop } from './Base'
import { Rect } from './Graphics'
import { Vec2 } from './Math'
import { getCoresCount, Thread } from './Thread'

let r: Rect
let v = new Vec2(0.2, 0.2)

MainLoop.actions.add('LOAD', () => {
    r = new Rect()
    r.size = new Vec2(100, 100)

    print(getCoresCount())

    let t = new Thread()
    t.run(()=>{
        print('Started')
        while (true){
            let a = 1 + 1
        }
    })
})

MainLoop.actions.add('UPDATE', () => {
    r.pos = r.pos.add(v)
})

MainLoop.actions.add('THREAD_ERR', () => {
    const data = <[any, string]> MainLoop.thread_err;

    print(data[1])
})