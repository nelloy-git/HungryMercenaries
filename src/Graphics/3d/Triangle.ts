import { Texture, VertexInformation } from "love.graphics";
import { Vec2, Vec3 } from "../../Math";
import { IsometricGrid } from './IsometricGrid'

export class Triangle {
    constructor(p1: Vec3, p2: Vec3, p3: Vec3){
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3

        this.__vertices = []
    }

    update(){
        let p1 = IsometricGrid.get(this.p1)
        let p2 = IsometricGrid.get(this.p2)
        let p3 = IsometricGrid.get(this.p3)

        this.__vertices = [
            []
        ]
    }

    p1: Vec3
    p2: Vec3
    p3: Vec3

    texture: Texture | undefined
    uv1: Vec2
    uv2: Vec2
    uv3: Vec2

    private __vertices: VertexInformation[]
}