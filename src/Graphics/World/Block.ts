import type { Mesh, Texture, VertexInformation } from 'love.graphics';

import { Compositor } from '../Compositor';

const HEIGHT = 100
const WIDTH = 100

type Side = 'BOT' | 'LEFT_REAR' | 'RIGHT_REAR' | 'LEFT_FRONT' | 'RIGHT_FRONT' | 'TOP'

const SIDE_MESHES: Record<Side, VertexInformation[]> = {
    BOT: [[0, 0.75 * HEIGHT, 0, 0],
          [WIDTH / 2, HEIGHT, 0, 1],
          [WIDTH, 0.75 * HEIGHT, 1, 1],
          [WIDTH / 2, 0.5 * HEIGHT, 1, 0]],
    LEFT_REAR: [[0, 0.25 * HEIGHT, 0, 0],
                [0, 0.75 * HEIGHT, 0, 1],
                [WIDTH / 2, 0.5 * HEIGHT, 1, 1],
                [WIDTH / 2, 0, 1, 0]],
    RIGHT_REAR: [[WIDTH / 2, 0, 0, 0],
                 [WIDTH / 2, 0.5 * HEIGHT, 0, 1],
                 [WIDTH, 0.75 * HEIGHT, 1, 1],
                 [WIDTH, 0.25 * HEIGHT, 1, 0]],
    LEFT_FRONT: [[0, 0.25 * HEIGHT, 0, 0],
                 [0, 0.75 * HEIGHT, 0, 1],
                 [WIDTH / 2, HEIGHT, 1, 1],
                 [WIDTH / 2, 0.5 * HEIGHT, 1, 0]],
    RIGHT_FRONT: [[WIDTH / 2, 0.5 * HEIGHT, 0, 0],
                  [WIDTH / 2, HEIGHT, 0, 1],
                  [WIDTH, 0.75 * HEIGHT, 1, 1],
                  [WIDTH, 0.25 * HEIGHT, 1, 0]],
    TOP: [[0, 0.25 * HEIGHT, 0, 0],
          [WIDTH / 2, 0.5 * HEIGHT, 0, 1],
          [WIDTH, 0.25 * HEIGHT, 1, 1],
          [WIDTH / 2, 0, 1, 0]],
}

export class Block extends Compositor {

    constructor(){
        super(WIDTH, HEIGHT)
    }

    update(){
        for (let side in this.__meshes){
            if (this.__textures[<Side>side]){
                this.drawDrawable(this.__meshes[<Side>side])
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

    private __meshes: Record<Side, Mesh> = {
        BOT: love.graphics.newMesh(SIDE_MESHES.BOT, 'fan'),
        LEFT_REAR: love.graphics.newMesh(SIDE_MESHES.LEFT_REAR, 'fan'),
        RIGHT_REAR: love.graphics.newMesh(SIDE_MESHES.RIGHT_REAR, 'fan'),
        LEFT_FRONT: love.graphics.newMesh(SIDE_MESHES.LEFT_FRONT, 'fan'),
        RIGHT_FRONT: love.graphics.newMesh(SIDE_MESHES.RIGHT_FRONT, 'fan'),
        TOP: love.graphics.newMesh(SIDE_MESHES.TOP, 'fan'),
    }

    private __textures: Record<Side, Texture | undefined> = {
        BOT: undefined,
        LEFT_REAR: undefined,
        RIGHT_REAR: undefined,
        LEFT_FRONT: undefined,
        RIGHT_FRONT: undefined,
        TOP: undefined,
    }
}