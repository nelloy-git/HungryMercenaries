import { graphics } from 'love';
import type { Mesh, Texture, VertexInformation } from 'love.graphics';
import { Vec2, Vec3 } from '../../Math';
import { EventActions } from '../../Utils';

import { Compositor } from '../Compositor';
import { Drawable3d } from '../Utils/Drawable3d';

type Side = 'BOT' | 'LEFT_REAR' | 'RIGHT_REAR' | 'LEFT_FRONT' | 'RIGHT_FRONT' | 'TOP'

type Rear = Extract<Side, 'BOT' | 'LEFT_REAR' | 'RIGHT_REAR'>
const REAR: Record<Rear, 0> = {
    BOT: 0,
    LEFT_REAR: 0,
    RIGHT_REAR: 0
}

type Front = Extract<Side, 'LEFT_FRONT' | 'RIGHT_FRONT' | 'TOP'>
const FRONT: Record<Front, 0> = {
    LEFT_FRONT: 0,
    RIGHT_FRONT: 0,
    TOP: 0
}

export class Block implements Drawable3d {

    constructor(width: number = 128, height: number = 128){
        this.actions = new EventActions(this.toString())
        this.pos = new Vec3(0, 0, 0)

        this.__compositor = new Compositor(width, height)
        this.__vertices = newVertices(width, height)
        this.__meshes = newMeshes(this.__vertices)
        this.__textures = newTextures()
    }

    draw(pos: Vec2, scale: number){
        print(pos.x, pos.y, scale, scale)
        love.graphics.draw(this.__compositor.canvas, pos.x, pos.y, 0, scale, scale)
    }

    update(){
        this.__compositor.clear()

        // for (const side in REAR){
        //     if (this.__textures[<Side>side]){
        //         this.drawDrawable(this.__meshes[<Side>side])
        //     }
        // }

        for (const side in FRONT){
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
    private __vertices: Record<Side, VertexInformation[]>
    private __meshes: Record<Side, Mesh>
    private __textures: Record<Side, Texture | undefined>
}

export namespace Block {
    export type Event = 'UPDATE'
}


function newVertices(width: number, height: number){
    let vertices: Record<Side, VertexInformation[]> = {
        BOT: [[0, height / 4, 0, 0],
              [width / 2, height, 0, 1],
              [width, height / 4, 1, 1],
              [width / 2, height / 2, 1, 0]],
        LEFT_REAR: [[0, 0.25 * height, 0, 0],
                    [0, height / 4, 0, 1],
                    [width / 2, height / 2, 1, 1],
                    [width / 2, 0, 1, 0]],
        RIGHT_REAR: [[width / 2, 0, 0, 0],
                     [width / 2, height / 2, 0, 1],
                     [width, height / 4, 1, 1],
                     [width, 0.25 * height, 1, 0]],
        LEFT_FRONT: [[0, 0.25 * height, 0, 0],
                     [0, height / 4, 0, 1],
                     [width / 2, height, 1, 1],
                     [width / 2, height / 2, 1, 0]],
        RIGHT_FRONT: [[width / 2, height / 2, 0, 0],
                      [width / 2, height, 0, 1],
                      [width, height / 4, 1, 1],
                      [width, 0.25 * height, 1, 0]],
        TOP: [[0, 0.25 * height, 0, 0],
              [width / 2, height / 2, 0, 1],
              [width, 0.25 * height, 1, 1],
              [width / 2, 0, 1, 0]],
    }
    return vertices
}

function newMeshes(vertices: Record<Side, VertexInformation[]>){
    let meshes: Record<Side, Mesh> = {
        BOT: love.graphics.newMesh(vertices.BOT, 'fan'),
        LEFT_REAR: love.graphics.newMesh(vertices.LEFT_REAR, 'fan'),
        RIGHT_REAR: love.graphics.newMesh(vertices.RIGHT_REAR, 'fan'),
        LEFT_FRONT: love.graphics.newMesh(vertices.LEFT_FRONT, 'fan'),
        RIGHT_FRONT: love.graphics.newMesh(vertices.RIGHT_FRONT, 'fan'),
        TOP: love.graphics.newMesh(vertices.TOP, 'fan'),
    }
    return meshes
}

function newTextures(){
    let textures: Record<Side, Texture | undefined> = {
        BOT: undefined,
        LEFT_REAR: undefined,
        RIGHT_REAR: undefined,
        LEFT_FRONT: undefined,
        RIGHT_FRONT: undefined,
        TOP: undefined,
    }
    return textures
}