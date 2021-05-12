import { Vec2 } from '../Math'
import { Layer } from './Layer'

export abstract class Drawable {
    constructor(){
        this.id = Drawable.__next_id++
        let layer = <Layer>Drawable.__layers.get(0)
        layer.push(this)

        this.__pos = new Vec2(0, 0)
        this.__size = new Vec2(0, 0)
        this.__visible = true
        this.__parent = undefined
        this.__level = 0
        this.__children = []
    }

    static draw(){
        for (const [level, layer] of Drawable.__layers){
            layer.draw()
        }
    }

    toString(){
        return this.constructor.name + '<' + this.id + '>'
    }

    abstract draw(): void


    get pos(){return this.__pos.copy()}
    set pos(v: Vec2){this.__pos = v.copy()}
    get abs_pos(){
        let parent_pos = this.__parent ? this.__parent.pos : new Vec2(0, 0)
        return parent_pos.add(this.__pos)
    }

    get size(){return this.__size.copy()}
    set size(v: Vec2){this.__size = v.copy()}

    get visible(){return this.__visible}
    set visible(f: boolean){this.__visible = f}

    get level(){return this.__level}
    set level(lvl: number){
        Drawable.__removeFromLayer(this)
        this.__level = lvl
        Drawable.__addToLayer(lvl, this)
    }

    get parent(){return this.__parent}
    set parent(p: Drawable | undefined){
        if (this.__parent){
            this.__parent.__children.splice(this.__parent.__children.indexOf(this))
        }

        this.__parent = p
        if (p){
            p.__children.push(this)
        }
    }
    get children(){return this.__children as ReadonlyArray<Drawable>}

    readonly id: number

    private __pos: Vec2
    private __size: Vec2
    private __visible: boolean
    private __parent: Drawable | undefined
    private __level: number
    private __children: Drawable[]

    private static __next_id = 0
    private static __layers = new Map<number, Layer>([
        [0, new Layer()]
    ])

    private static __addToLayer(level: number, obj: Drawable){
        let layer = Drawable.__layers.get(level)
        if (!layer){
            layer = new Layer()
            Drawable.__layers.set(level, layer)
            Drawable.__layers = new Map([...Drawable.__layers.entries()].sort())
        }

        layer.push(obj)
    }

    private static __removeFromLayer(obj: Drawable){
        let level = obj.__level

        let layer = Drawable.__layers.get(level)
        if (!layer){
            throw obj.toString() + ': is in indefined level.'
        }

        let pos = layer.indexOf(obj)
        if (pos < 0){
            throw obj.toString() + ': obj.__level is not equal to its real level.'
        }

        layer.splice(pos)

        // Clear empty layer
        if (layer.length <= 0){
            Drawable.__layers.delete(level)
        }
    }
}