import type { AlignMode, Shader, Text as LoveText } from 'love.graphics'

import { StdWidget } from './Std'
import { Font } from './Font'

const graphics = love.graphics
const newLoveText = love.graphics.newText
const DEFAULT = love.graphics.newFont()

export class Text extends StdWidget {

    constructor(){
        super()

        this._drawable = newLoveText(DEFAULT)
        this.__text = ''
        this.__align = 'left'
    }
    
    destroy(){
        this._drawable.release()
        super.destroy()
    }

    /**
     * Contents of the Text object.
     *
     * @link [Text:setf](https://love2d.org/wiki/Text:setf)
     */
    get text(){return this.__text}
    set text(str: string){
        this.__text = str
        this._drawable.setf(this.__text, this.pixel_size.x, this.__align)
    }

    /**
     * The Font used with the text.
     *
     * @link [Text:setFont](https://love2d.org/wiki/Text:setFont)
     */
    get font(){return this.__font}
    set font(font: Font | undefined){
        let love_font = font ? font.font : DEFAULT
        this._drawable.setFont(love_font)
    }

    /**
     * The alignment of the text.
     *
     * @link [Text:setf](https://love2d.org/wiki/Text:setf)
     */
    get align(){return this.__align}
    set align(mode: AlignMode){
        this.__align = mode
        this._drawable.setf(this.__text, this.pixel_size.x, this.__align)
    }

    get pixel_size(){
        return this.draw_size.copy()
    }

    protected _drawable: LoveText

    private __text: string
    private __font: Font | undefined
    private __align: AlignMode
}