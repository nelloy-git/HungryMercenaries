import { Vec2, Vec3 } from "../../Math"

const K = 0.82
// const cos30 = math.cos(math.pi / 6)
const sin = math.sin(math.pi * 26.565 / 180)
const cos = math.cos(math.pi * 26.565 / 180)
// const sin60 = math.sin(math.pi / 3)

export class IsometricGrid {

    static get(v: Vec3){
        let x = v.x * IsometricGrid.step_x.x + v.y * IsometricGrid.step_y.x
        let y = v.x * IsometricGrid.step_x.y + v.y * IsometricGrid.step_y.y + v.z * IsometricGrid.step_z.y
        return new Vec2(x, y)
    }

    static step = 100
    static step_x: Vec2 = new Vec2(IsometricGrid.step * cos, IsometricGrid.step * sin)
    static step_y: Vec2 = new Vec2(-IsometricGrid.step * cos, IsometricGrid.step * sin)
    static step_z: Vec2 = new Vec2(0, IsometricGrid.step)

    private constructor(){}
}