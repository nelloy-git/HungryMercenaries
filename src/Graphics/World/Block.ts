import type { Mesh, Texture, VertexInformation } from 'love.graphics';

import { Compositor } from '../Compositor';

const HEIGHT = 100
const WIDTH = 100

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


export class Block extends Compositor {

    constructor(width: number = 128, height: number = 128){
        super(width, height)

        this.__vertices = newVertices(width, height)
        this.__meshes = newMeshes(this.__vertices)
        this.__textures = newTextures()
    }

    update(){
        this.clear()

        for (const side in REAR){
            if (this.__textures[<Side>side]){
                this.drawDrawable(this.__meshes[<Side>side])
            }
        }

        this.draw(() => {
            if (this.drawInside){
                this.drawInside(this.width, this.height)
            }
        })

        for (const side in FRONT){
            if (this.__textures[<Side>side]){
                this.drawDrawable(this.__meshes[<Side>side])
            }
        }
    }

    drawInside: ((width: number, height: number) => void) | undefined

    getSide(side: Side){
        return this.__textures[side]
    }

    setSide(side: Side, texture: Texture | undefined){
        this.__textures[side] = texture
        this.__meshes[side].setTexture(<Texture>texture)
    }

    private __vertices: Record<Side, VertexInformation[]>
    private __meshes: Record<Side, Mesh>
    private __textures: Record<Side, Texture | undefined>
}


function newVertices(width: number, height: number){
    let vertices: Record<Side, VertexInformation[]> = {
        BOT: [[0, 0.75 * height, 0, 0],
              [width / 2, height, 0, 1],
              [width, 0.75 * height, 1, 1],
              [width / 2, 0.5 * height, 1, 0]],
        LEFT_REAR: [[0, 0.25 * height, 0, 0],
                    [0, 0.75 * height, 0, 1],
                    [width / 2, 0.5 * height, 1, 1],
                    [width / 2, 0, 1, 0]],
        RIGHT_REAR: [[width / 2, 0, 0, 0],
                     [width / 2, 0.5 * height, 0, 1],
                     [width, 0.75 * height, 1, 1],
                     [width, 0.25 * height, 1, 0]],
        LEFT_FRONT: [[0, 0.25 * height, 0, 0],
                     [0, 0.75 * height, 0, 1],
                     [width / 2, height, 1, 1],
                     [width / 2, 0.5 * height, 1, 0]],
        RIGHT_FRONT: [[width / 2, 0.5 * height, 0, 0],
                      [width / 2, height, 0, 1],
                      [width, 0.75 * height, 1, 1],
                      [width, 0.25 * height, 1, 0]],
        TOP: [[0, 0.25 * height, 0, 0],
              [width / 2, 0.5 * height, 0, 1],
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