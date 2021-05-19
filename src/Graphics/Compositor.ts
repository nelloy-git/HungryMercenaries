import type { ArcType, BlendMode, Canvas, CanvasSettings, Drawable, DrawMode, Quad, Shader, Texture } from "love.graphics";
import { Transform } from "love.math";

import { Color, Object } from "../Utils";

const graphics = love.graphics

export type Points = [x1: number, y1: number, ...other: Array<number>]
export type Line = [x1: number, y1: number, x2: number, y2: number, ...other: Array<number>]
export type Polygon = [x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, ...other: Array<number>]

export class Compositor extends Object {
    constructor(width: number, height: number, settings?: CanvasSettings){
        super()

        this.background_color = new Color(0, 0, 0, 0)
        this.color = new Color(255, 255, 255, 255)
        this.blend = 'alpha'

        this.canvas = graphics.newCanvas(width, height)
    }

    release(){
        this.canvas.release()
    }

    save(){
        return this.canvas.newImageData()
    }

    clear(){
        this.canvas.renderTo(this.__renderTo(() => {
            graphics.setBackgroundColor(this.background_color.unpack())
            graphics.clear()
        }))
    }

    /** Compositor's properties are ignored */
    draw(func: (this: void) => void){
        this.canvas.renderTo(this.__renderTo(func))
    }

    drawPoints(points: Points){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.points(points)
        }))
    }

    drawLine(line: Line){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.line(line)
        }))
    }

    drawPolygon(polygon: Polygon, mode: DrawMode = 'line'){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.polygon(mode, polygon)
        }))
    }

    drawRect(x: number, y: number, w: number, h: number,
             rx: number = 0, ry: number = 0,
             mode: DrawMode = 'line', segments: number = 10){
        
        this.canvas.renderTo(this.__renderTo(() => {
            graphics.rectangle(mode, x, y, w, h, rx, ry, segments)
        }))
    }

    drawArc(x: number, y: number, 
            r: number, a1: number, a2: number,
            mode: DrawMode = 'line', type: ArcType = 'open', segments: number = 10){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.arc(mode, type, x, y, r, a1, a2, segments)
        }))
    }

    drawCircle(x: number, y: number, r: number,
               mode: DrawMode = 'line', segments: number = 10){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.circle(mode, x, y, r, segments)
        }))
    }

    drawEllipse(x: number, y: number, rx: number, ry: number,
                mode: DrawMode = 'line', segments: number = 10){
        
        this.canvas.renderTo(this.__renderTo(() => {
            graphics.ellipse(mode, x, y, rx, ry, segments)
        }))         
    }

    drawDrawable(drawable: Drawable,
                 x?: number, y?: number, r?: number,
                 scale_x?: number, scale_y?: number,
                 origin_x?: number, origin_y?: number,
                 shearing_x?: number, shearing_y?: number){
        
        this.canvas.renderTo(this.__renderTo(() => {
            graphics.draw(drawable, x, y, r, scale_x, scale_y, origin_x, origin_y, shearing_x, shearing_y)
        }))
    }

    drawTexture(texture: Texture, transform: Transform){

        this.canvas.renderTo(this.__renderTo(() => {
            graphics.draw(texture, transform)
        }))
    }

    drawTextureQuad(texture: Texture, quad: Quad, transform: Transform): void
    drawTextureQuad(texture: Texture, quad: Quad,
                    x: number, y: number, r: number,
                    scale_x: number, scale_y: number,
                    origin_x: number, origin_y: number,
                    shearing_x: number, shearing_y: number): void
    drawTextureQuad(texture: Texture, quad: Quad,
                    x_or_transform: Transform | number, y?: number, r?: number,
                    scale_x?: number, scale_y?: number,
                    origin_x?: number, origin_y?: number,
                    shearing_x?: number, shearing_y?: number){

        if (typeof x_or_transform === 'number'){
            this.canvas.renderTo(this.__renderTo(() => {
                graphics.draw(texture, quad, x_or_transform, y, r, scale_x, scale_y, origin_x, origin_y, shearing_x, shearing_y)
            }))
        } else {
            this.canvas.renderTo(this.__renderTo(() => {
                graphics.draw(texture, quad, x_or_transform)
            }))
        }
    }

    private __renderTo(func: (func: void) => void){
        return () => {
            graphics.push('all')
    
            graphics.setColor(this.color.unpack())
            graphics.setBlendMode(this.blend)
            graphics.setShader(<Shader>this.shader)
            if (this.transform){
                graphics.replaceTransform(this.transform)
            }
    
            func()
    
            graphics.pop()
        }
    }

    get width(){return this.canvas.getWidth()}
    get height(){return this.canvas.getHeight()}

    background_color: Color
    blend: BlendMode
    color: Color
    shader: Shader | undefined
    transform: Transform | undefined

    readonly canvas: Canvas
}