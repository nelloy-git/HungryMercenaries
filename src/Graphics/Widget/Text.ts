import type { AlignMode, Text as LoveText } from 'love.graphics'

import { Widget } from '../Widget'
import { Font } from './Font'

const newLoveText = love.graphics.newText
const DEFAULT = love.graphics.newFont()

export class Text extends Widget {

    constructor(){
        super()

        this.drawable = newLoveText(DEFAULT)
        this.__text = ''
        this.__align = 'left'
    }
    
    destroy(){
        this.drawable.release()
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
        this.drawable.setf(this.__text, this.size.x, this.__align)
    }

    /**
     * The Font used with the text.
     *
     * @link [Text:setFont](https://love2d.org/wiki/Text:setFont)
     */
    get font(){return this.__font}
    set font(font: Font | undefined){
        let love_font = font ? font.font : DEFAULT
        this.drawable.setFont(love_font)
    }

    /**
     * The alignment of the text.
     *
     * @link [Text:setf](https://love2d.org/wiki/Text:setf)
     */
    get align(){return this.__align}
    set align(mode: AlignMode){
        this.__align = mode
        this.drawable.setf(this.__text, this.size.x, this.__align)
    }

    drawable: LoveText

    private __text: string
    private __font: Font | undefined
    private __align: AlignMode
}