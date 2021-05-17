import { Canvas } from "love.graphics";
import { Vec2, Vec3 } from "../../Math";
import { Widget } from "../Widget";
import { Block } from "./Block";

const OFFSET_Z = 50
const OFFSET_y = 50 * 1
const OFFSET_X = 50

export class World extends Widget {

    constructor(dims: Vec3){
        super()

        this.__size = new Vec2(100, 100)
        this.__mat = []
        this.__dims = dims.copy()
        // this.__canvas = love.graphics.newCanvas(this.__size.x, this.__size.y, )

        for (let z = 0; z < dims.z; z++){
            for (let y = 0; y < dims.y; y++){
                for (let x = 0; x < dims.x; x++){
                    let block = new Block()
                    this.__mat.push(block)

                    block.parent = this

                    let pos = new Vec2(
                        this.size.x / 2,
                        this.size.y / 2
                    )
                    
                    // block.pos = pos
                }
            }
        }
    }

    draw(){
        for (let i = 0; i < this.__mat.length; i++){
            this.__mat[i].draw()
        }
    }

    get(pos: Vec3){
        let i = pos.z + this.__dims.z * (pos.y + this.__dims.y * pos.x)
        return this.__mat[i]
    }

    set(pos: Vec3, block: Block){


    }

    get dimentions(){
        return this.__dims.copy()
    }

    get size(){
        return 
    }

    private __size: Vec2
    private __mat: Block[]
    private __dims: Vec3
    private __canvas: Canvas
}