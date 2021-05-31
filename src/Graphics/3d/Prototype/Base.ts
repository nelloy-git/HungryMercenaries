import { Vec3 } from "../../../Math";
import { Object } from "../../../Utils";
import { IsometricGrid } from "../IsometricGrid";

export abstract class ProtoBase extends Object {
    abstract draw(grid: Readonly<IsometricGrid>, pos?: Vec3): void
    abstract update(): void
}