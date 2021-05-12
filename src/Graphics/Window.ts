import * as LWin from 'love.window'
import { Vec2 } from '../Math'

export class Window {

    static get inst(){
        return Window.__inst
    }

    get pos(){
        let [x, y, display] = LWin.getPosition()
        return new Vec2(x, y)
    }

    set pos(v: Vec2){
        let [x, y, display] = LWin.getPosition()
        LWin.setPosition(v.x, v.y, display)
    }

    get fullscreen(){
        let [full, mode] = LWin.getFullscreen()
        return full
    }

    set fullscreen(flag: boolean){
        let [full, mode] = LWin.getFullscreen()
        LWin.setFullscreen(flag, mode)
    }

    private constructor(){
    }

    private static __inst: Window = new Window()
}