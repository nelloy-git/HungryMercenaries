import { Thread as LoveThread } from "love.thread"
import { Action, ActionList } from "../Utils"
import { EventActions } from "../Utils/Action/EventActions"

type UpdateData = [dt: number]
type ThreadErrorData = [th: LoveThread, err: string]
type MousePressedData = [x: number, y: number, btn: number, is_touch: boolean]
type MouseReleasedData = [x: number, y: number, btn: number, is_touch: boolean]
type MouseMovedData = [x: number, y: number, dx: number, dy: number, is_touch: boolean]


export class MainLoop {
    static readonly load = new ActionList()
    static readonly update = new ActionList<UpdateData>()
    static readonly draw = new ActionList()

    static readonly thread_error = new ActionList<ThreadErrorData>()

    static readonly mouse_pressed = new ActionList<MousePressedData>()
    static readonly mouse_released = new ActionList<MouseReleasedData>()
    static readonly mouse_moved = new ActionList<MouseMovedData>()
}

export namespace MainLoop {

    love.load = () => {
        MainLoop.load.run()
    }

    love.update = (dt) => {
        MainLoop.update.run(dt)
    }

    love.draw = () => {
        MainLoop.draw.run()
    }

    love.threaderror = (th, err) => {
        MainLoop.thread_error.run(th, err)
    }

    love.mousepressed = (x, y, btn, is_touch) => {
        MainLoop.mouse_pressed.run(x, y, btn, is_touch)
    }

    love.mousereleased = (x, y, btn, is_touch) => {
        MainLoop.mouse_released.run(x, y, btn, is_touch)
    }

    love.mousemoved = (x, y, dx, dy, is_touch) => {
        MainLoop.mouse_moved.run(x, y, dx, dy, is_touch)
    }
}