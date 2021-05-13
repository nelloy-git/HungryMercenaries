import type { Font, Text as LoveText } from 'love.graphics'

import { Widget } from './Widget'

const newFont = love.graphics.newFont
const newText = love.graphics.newText

export class Text extends Widget {

    constructor(path: string){
        super()
        this.__font = newFont(path)
        this.drawable = newText(this.__font)
    }

    drawable: LoveText
    private __font: Font
}