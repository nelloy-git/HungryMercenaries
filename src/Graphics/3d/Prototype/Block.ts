import type { Mesh, Texture, VertexInformation } from 'love.graphics';
import { Vec2, Vec3 } from '../../../Math';
import { EventActions } from '../../../Utils';

import { Compositor } from '../../Compositor';
import { IsometricGrid } from '../IsometricGrid';
import { Prototype } from '../Prototype';
import { Rectangle } from './Rectangle';

type Side = 'LEFT' | 'RIGHT' | 'TOP'

export class Block extends Prototype {

    constructor(render_size: number){
        super()

        this.render_grid = new IsometricGrid(render_size)
        this.render_grid.origin = new Vec2(render_size, render_size)
        this.size = new Vec3(1, 1, 1)

        this.__compositor = new Compositor(2 * render_size, 2 * render_size)
        this.sides = {
            LEFT: new Rectangle(new Vec3(0, 1, 1),
                                new Vec3(0, 1, 0),
                                new Vec3(1, 1, 0),
                                new Vec3(1, 1, 1)),

            RIGHT: new Rectangle(new Vec3(1, 1, 1),
                                 new Vec3(1, 1, 0),
                                 new Vec3(1, 0, 0),
                                 new Vec3(1, 0, 1)),

            TOP: new Rectangle(new Vec3(0, 1, 1),
                               new Vec3(1, 1, 1),
                               new Vec3(1, 0, 1),
                               new Vec3(0, 0, 1))
        }
    }

    draw(grid: IsometricGrid, pos: Vec3 = new Vec3(0, 0, 0)){
        let pos2d = grid.to2d(pos)
        love.graphics.draw(this.__compositor.canvas,
                           pos2d.x, pos2d.y, 0,
                           grid.step / this.render_grid.step,
                           grid.step / this.render_grid.step,
                           this.render_grid.step,
                           this.render_grid.step)
    }

    update(){
        this.__compositor.clear()
        this.__compositor.draw(() => {
            for (const side in this.sides){
                this.sides[<Side>side].update()
                this.sides[<Side>side].draw(this.render_grid)
            }
        })
    }

    readonly size: Vec3


    sides: Record<Side, Rectangle>
    render_grid: IsometricGrid

    private __compositor: Compositor
    // private __side_origin: Record<Side, Vec2>
}