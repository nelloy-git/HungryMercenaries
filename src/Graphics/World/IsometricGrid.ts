import { Vec2, Vec3 } from "../../Math"

const K = 0.82
// const cos30 = math.cos(math.pi / 6)
const sin30 = math.sin(math.pi / 6)
const cos60 = math.cos(math.pi / 3)
// const sin60 = math.sin(math.pi / 3)

export class IsometricGrid {
    constructor(){
        this.step = 1
    }

    get(v: Vec3){
        let vi = v.copy().mult(K * this.step)
        return new Vec2((vi.x - vi.y) * sin30, (vi.x + vi.y) * cos60 + vi.z)
    }

    step: number
}