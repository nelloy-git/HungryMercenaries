import type { Mesh, Texture, VertexInformation } from 'love.graphics';
import { Vec2, Vec3 } from '../../Math';
import { EventActions } from '../../Utils';

import { Compositor } from '../Compositor';
import { Rectangle } from './Rectangle';

type Side = 'LEFT' | 'RIGHT' | 'TOP'

export class Block {

    constructor(width: number = 128, height: number = 128){
        this.actions = new EventActions(this.toString())
        this.pos = new Vec3(0, 0, 0)

        this.__compositor = new Compositor(width, height)
        this.__sides = {
            LEFT: new Rectangle()
        }
    }

    draw(zero: Vec2 = new Vec2(0, 0)){
        love.graphics.draw(this.__compositor.canvas, zero.x, zero.y)
    }

    update(offset: Vec3 = new Vec3(0, 0, 0)){
        this.__compositor.clear()
        for (const side in this.__meshes){
            if (this.__textures[<Side>side]){
                this.__compositor.drawDrawable(this.__meshes[<Side>side])
            }
        }
    }

    getSide(side: Side){
        return this.__textures[side]
    }

    setSide(side: Side, texture: Texture | undefined){
        this.__textures[side] = texture
        this.__meshes[side].setTexture(<Texture>texture)
    }

    actions: EventActions<Block.Event, [Block]>
    pos: Vec3

    private __compositor: Compositor
    private __sides: Record<Side, VertexInformation[]>
}

export namespace Block {
    export type Event = 'UPDATE'
}


function newVertices(width: number, height: number){
    let vertices: Record<Side, VertexInformation[]> = {
        LEFT: [[0, height / 4, 0, 0],
               [0, 3 * height / 4, 0, 1],
               [width / 2, height, 1, 1],
               [width / 2, height / 2, 1, 0]],
        RIGHT: [[width / 2, height / 2, 0, 0],
                [width / 2, height, 0, 1],
                [width, 3 * height / 4, 1, 1],
                [width, height / 4, 1, 0]],
        TOP: [[0, 0.25 * height, 0, 0],
              [width / 2, height / 2, 0, 1],
              [width, 0.25 * height, 1, 1],
              [width / 2, 0, 1, 0]],
    }
    return vertices
}

function newMeshes(vertices: Record<Side, VertexInformation[]>){
    let meshes: Record<Side, Mesh> = {
        LEFT: love.graphics.newMesh(vertices.LEFT, 'fan'),
        RIGHT: love.graphics.newMesh(vertices.RIGHT, 'fan'),
        TOP: love.graphics.newMesh(vertices.TOP, 'fan'),
    }
    return meshes
}

function newTextures(){
    let textures: Record<Side, Texture | undefined> = {
        LEFT: undefined,
        RIGHT: undefined,
        TOP: undefined,
    }
    return textures
}