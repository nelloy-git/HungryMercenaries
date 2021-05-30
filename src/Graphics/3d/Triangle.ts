import { Mesh, Texture, VertexInformation } from "love.graphics";
import { Vec2, Vec3 } from "../../Math";
import { IsometricGrid } from './IsometricGrid'

export class Triangle {
    constructor(p1: Vec3, p2: Vec3, p3: Vec3){
        this.points3d = [p1, p2, p3]
        this.pointsUV = [new Vec2(0, 0), new Vec2(0, 0), new Vec2(0, 0)]

        this.__vertices = []
    }

    draw(zero: Vec2 = new Vec2(0, 0)){   
        if (this.__mesh){
            love.graphics.draw(this.__mesh, zero.x, zero.y)
        }
    }

    update(scale: number){
        this.__vertices = []
        for (let i = 0; i < 3; i++){
            let p = IsometricGrid.get(this.points3d[i]).mult(scale)
            let uv = this.pointsUV[i]

            let vertex: VertexInformation = [
                p.x, p.y, uv.x, uv.y
            ]

            this.__vertices.push(vertex)
        }

        if (this.__mesh){
            this.__mesh.release()
        }
        this.__mesh = love.graphics.newMesh(this.__vertices, 'fan', 'dynamic')
        this.__mesh.setTexture(<Texture>this.texture)
    }

    points3d: [Vec3, Vec3, Vec3]

    texture: Texture | undefined
    pointsUV: [Vec2, Vec2, Vec2]

    private __vertices: VertexInformation[]
    private __mesh: Mesh | undefined
}