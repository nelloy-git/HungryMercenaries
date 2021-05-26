import { Vec2, Vec3 } from "../../Math"

export interface Drawable3d {
    draw(pos: Vec2, scale: number): void

    pos: Vec3
}