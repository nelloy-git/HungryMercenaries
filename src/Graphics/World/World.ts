// import type { CanvasSettings } from "love.graphics";
// import { Vec2, Vec3 } from "../../Math";
// import { Canvas } from "../StdWidget/Canvas";
// import { Widget } from "../Widget";
// import { Block } from "./Block";
// import { IsometricGrid } from './IsometricGrid'

// const DEFAULT_SIZE = new Vec2(640, 480)

// const OFFSET_X = new Vec3(1, 0, 0)
// const OFFSET_Y = new Vec3(0, 1, 0)
// const OFFSET_Z = new Vec3(0, 0, 1)

// export class World extends Canvas {

//     constructor(pixel_size: Vec2 = DEFAULT_SIZE, block_step: number = 150){
//         super(pixel_size)

//         this._grid = new IsometricGrid()
//         this._grid.step = block_step

//         let step_x = this._grid.get(OFFSET_X)
//         let step_y = this._grid.get(OFFSET_Y)
//         let step_z = this._grid.get(OFFSET_Z)

//         let grid_x = Math.max(Math.ceil(pixel_size.x / 2 / step_x.x),
//                               Math.ceil(pixel_size.y / 2 / step_x.y))
//         let grid_y = Math.max(Math.ceil(pixel_size.x / 2 / step_y.x),
//                               Math.ceil(pixel_size.y / 2 / step_y.y))
//         let grid_z = Math.ceil(pixel_size.y / 2 / step_z.y)
//         this._grid_size = new Vec3(2 * grid_x, 2 * grid_y, 2 * grid_z)

//         let block_size = new Vec2(step_x.x + step_y.x, step_x.y - step_y.y + step_z.y)

//         print()
//         for (let z = -grid_z; z < grid_z; z++){
//             for (let y = -grid_y; y < grid_y; y++){
//                 for (let x = -grid_x; x < grid_x; x++){
//                     let block = new Block()
//                     this.sub.push(block)

//                     block.parent = this
//                     let offset = step_x.mult(x).add(step_y.mult(y)).add(step_z.mult(z))
//                     print(offset)
//                     block.pos = pixel_size.mult(0.5).add(offset)
//                     block.draw_size = block_size.copy()
//                 }
//             }
//         }
//     }

//     protected _grid: IsometricGrid
//     protected _grid_size: Vec3
// }