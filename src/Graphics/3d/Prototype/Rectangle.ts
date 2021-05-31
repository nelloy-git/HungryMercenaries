import { Mesh, Texture, VertexInformation } from "love.graphics";
import { Vec2, Vec3 } from "../../../Math";

import { ProtoBase } from "./Base";
import { IsometricGrid } from '../IsometricGrid'

export class Rectangle extends ProtoBase {
    constructor(p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3){
        super()
        
        this.points3d = [p1, p2, p3, p4]
        this.pointsUV = [
            new Vec2(0, 0),
            new Vec2(0, 1),
            new Vec2(1, 1),
            new Vec2(1, 0)
        ]

        this.update()
    }

    release(){
        this.__mesh.release()
    }

    draw(grid: IsometricGrid, pos: Vec3 = new Vec3(0, 0, 0)){
        let pos2d = grid.to2d(pos)
        love.graphics.draw(this.__mesh,
                           pos2d.x, pos2d.y, 0,
                           grid.step, grid.step)
    }

    update(){
        this.__vertices = []
        for (let i = 0; i < 4; i++){
            let p = Rectangle.__Grid.to2d(this.points3d[i])
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

    
    points3d: [Vec3, Vec3, Vec3, Vec3]

    texture: Texture | undefined
    pointsUV: [Vec2, Vec2, Vec2, Vec2]

    private __vertices!: VertexInformation[]
    private __mesh!: Mesh

    private static __Grid = new IsometricGrid(1)
}