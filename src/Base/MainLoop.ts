import { Thread } from "love.thread"
import { EventActions } from "../Utils/Action/EventActions"

export class MainLoop {

    static readonly actions = new EventActions<MainLoop.Event>()

    static readonly time: number = 0

    static readonly update_dt: number | undefined
    static readonly thread_err: [th: Thread, err: string] | undefined
    static readonly mouse_pressed: [x: number, y: number, btn: number, is_touch: boolean] | undefined

}

export namespace MainLoop {
    export type Event = 'LOAD' | 'UPDATE' | 'DRAW' | 'THREAD_ERR'

    love.load = () => {
        MainLoop.actions.run('LOAD')
    }

    love.update = (dt) => {
        (<number>MainLoop.time) += dt;

        (<number>MainLoop.update_dt) = dt
        MainLoop.actions.run('UPDATE');
        (<undefined>MainLoop.update_dt) = undefined
    }

    love.draw = () => {
        MainLoop.actions.run('DRAW')
    }

    love.threaderror = (th, err) => {
        (<[Thread, string]>MainLoop.thread_err) = [th, err]
        MainLoop.actions.run('THREAD_ERR');
        (<undefined>MainLoop.thread_err) = undefined
    }

    love.mousepressed = (x, y, btn, is_touch) => {

    }
}