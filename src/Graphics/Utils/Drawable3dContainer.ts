import { SortedList } from '../../Utils'
import { Vec2, Vec3 } from "../../Math"
import { Drawable3d } from './Drawable3d'

export interface Drawable3dContainer extends Drawable3d {
    list: SortedList<Drawable3d>
}