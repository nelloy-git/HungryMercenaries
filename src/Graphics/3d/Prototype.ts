import { Vec3 } from "../../Math";
import { IsometricGrid } from "./IsometricGrid";

export abstract class Prototype {
    abstract draw(grid: Readonly<IsometricGrid>, pos?: Vec3): void
    abstract update(): void
}