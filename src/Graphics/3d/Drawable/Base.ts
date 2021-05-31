import { Vec3 } from "../../../Math";
import { Object } from "../../../Utils";
import { IsometricGrid } from "../IsometricGrid";
import { ProtoBase } from "../Prototype";

export class DrawBase extends Object {
    constructor(proto: ProtoBase){
        super()

        this.pos = new Vec3(0, 0, 0)

        this.__prototype = proto
    }

    release(){

    }

    draw(grid: IsometricGrid){
        this.__prototype.draw(grid, this.pos)
    }

    pos: Vec3

    private __prototype: ProtoBase
}