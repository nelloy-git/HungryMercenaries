import type { CanvasSettings } from "love.graphics";
import { Vec2, Vec3 } from "../../Math";
import { SortedList } from "../../Utils";
import { Compositor } from "../Compositor";
import { Drawable3d } from "../Utils/Drawable3d";
import { IsometricGrid } from '../3d/IsometricGrid'

const DEFAULT_SIZE = new Vec2(640, 480)


export class World {

    constructor(pixel_size: Vec2 = DEFAULT_SIZE){
        this.scale = 1
        this.objects = new SortedList((obj) => { return obj.pos.length })

        this._compositor = new Compositor(pixel_size.x, pixel_size.y)
        this._grid = new IsometricGrid()
        this._grid.step = 1
    }

    draw(pos: Vec2){
        this._grid.step = 128
        this._compositor.draw(() => {
            for (const obj of this.objects){
                let pos = this._grid.get(obj.pos)
                print(obj, obj.pos, ' -> ', pos)
                obj.draw(pos, this.scale)
            }
        })
        love.graphics.draw(this._compositor.canvas, pos.x, pos.y)
    }
    
    scale: number
    readonly objects: SortedList<Drawable3d>

    protected _compositor: Compositor
    protected _grid: IsometricGrid
}