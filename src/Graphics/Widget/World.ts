import { Vec2 } from "../../Math";
import { SortedList } from "../../Utils";
import { Compositor } from "../Compositor";
import { DrawBase, IsometricGrid } from "../3d";
import { Widget } from "./Base";

export class World extends Widget {

    constructor(pos: Vec2, size: Vec2){
        super(pos, size)
        this.objects = new SortedList((obj) => { return obj.pos.length })

        this.__compositor = new Compositor(size.x, size.y)
        this.grid = new IsometricGrid()
        this.grid.origin = new Vec2(size.x / 2, 0)
        this.grid.step = 32
    }

    draw(){
        this.__compositor.draw(() => {
            for (const obj of this.objects){
                obj.draw(this.grid)
            }
        })
        love.graphics.draw(this.__compositor.canvas, this.pos.x, this.pos.y)
    }
    
    readonly grid: IsometricGrid
    readonly objects: SortedList<DrawBase>

    private __compositor: Compositor
}