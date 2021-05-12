import { Rect } from './Frame/Rect'
import { Drawable } from './Frame/Drawable'
import { Window } from './Frame/Window'
import { Vec2 } from './Math'

export function init(){
    let rect: Rect
    let win = Window.inst

    love.load = () => {
        win.fullscreen = true

        rect = new Rect()
        rect.size = new Vec2(100, 100)
    }

    let vel = new Vec2(0.1, 0.1)
    love.update = (dt) => {
        rect.pos = rect.pos.add(vel)
    }

    love.draw = () => {
        Drawable.draw()
    };

    love.keypressed = (key) => {
        if (key == 'escape'){
            love.event.quit()
        }
    }
}