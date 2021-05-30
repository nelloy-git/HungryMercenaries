import { Vec2, Vec3 } from "../../Math"

const sin = math.sin(math.pi * 26.565 / 180)
const cos = math.cos(math.pi * 26.565 / 180)

export class IsometricGrid {

    constructor(step: number = 64){
        this.step = step
        this.origin = new Vec2(0, 0)
    }

    to2d(v: Vec3){
        let x = v.x * this.__step_x.x + v.y * this.__step_x.y + v.z * this.__step_x.z
        let y = v.x * this.__step_y.x + v.y * this.__step_y.y + v.z * this.__step_y.z
        return new Vec2(x, y).add(this.origin)
    }

    get step(){
        return this.__step
    }

    set step(step: number){
        this.__step = step

        this.__step_x = new Vec3(step * cos, -step * cos, 0)
        this.__step_y = new Vec3(step * sin, step * sin, -step)
    }

    origin: Vec2

    private __step!: number
    private __step_x!: Vec3
    private __step_y!: Vec3
}