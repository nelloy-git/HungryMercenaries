import * as LoveWindow from 'love.window'
import { Vec2 } from '../Math'

export class Window {

    static get pos(){
        let [x, y, display] = LoveWindow.getPosition()
        return new Vec2(x, y)
    }

    static set pos(v: Vec2){
        let [x, y, display] = LoveWindow.getPosition()
        LoveWindow.setPosition(v.x, v.y, display)
    }

    static get fullscreen(){
        let [full, mode] = LoveWindow.getFullscreen()
        return full
    }

    static set fullscreen(flag: boolean){
        let [full, mode] = LoveWindow.getFullscreen()
        LoveWindow.setFullscreen(flag, mode)
    }

    static get vsync(): Window.VSync {
        return LoveWindow.getVSync()
    }

    static set vsync(vsync: Window.VSync){
        LoveWindow.setVSync(vsync)
    }

    private constructor(){
    }
}

export namespace Window {
    export enum VSync {
        ENABLED = -1,
        DISABLED = 0,
        ADAPTIVE = 1,
    }
}