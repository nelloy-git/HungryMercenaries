import type { FilterMode, Font as LoveFont } from 'love.graphics'
import type { HintingMode } from 'love.font'

import { Object } from '../../Utils'

const newLoveFont = love.graphics.newFont

export class Font extends Object {
    constructor(filename: string)
    constructor(filename: string, size: number, hinting: HintingMode)
    constructor(filename: string, size?: number, hinting?: HintingMode){
        super()

        this.font = newLoveFont(filename, <number>size, <HintingMode>hinting);
        this.__fallbacks = [];
        [this.__filter_minify, this.__filter_magnify, this.__filter_anosotropy] = 
            this.font.getFilter()
    }

    release(){
        this.font.release()
    }

    /**
     * Determines the horizontal size a line of text needs. Does not support
     * line-breaks.
     * @param line A line of text.
     * @return width, The width of the line.
     * @link [Font:getWidth](https://love2d.org/wiki/Font:getWidth)
     */
    getWidth(line: string){return this.font.getWidth(line)}

    /**
     * Gets formatting information for text, given a wrap limit.
     *
     * This export function accounts for newlines correctly (i.e. '\n').
     * @param text The text that will be wrapped.
     * @param max_line_width The maximum width in pixels of each line that text is allowed before wrapping.
     * @return width, The maximum width of the wrapped text.
     * @return wrappedtext, A sequence containing each line of text that was wrapped.
     * @link [Font:getWrap](https://love2d.org/wiki/Font:getWrap)
     */
    wrap(text: string, max_line_width: number){
        let [width, lines] = this.font.getWrap(text, max_line_width)
        return $multi(width, lines)
    }

    /**
     * Gets the ascent of the Font. The ascent spans the distance between the baseline
     * and the top of the glyph that reaches farthest from the baseline.
     * @link [Font:getAscent](https://love2d.org/wiki/Font:getAscent)
     */
    get ascent(){return this.font.getAscent()}

    /**
     * Gets the baseline of the Font. Most scripts share the notion of a baseline: an
     * imaginary horizontal line on which characters rest. In some scripts, parts of
     * glyphs lie below the baseline.
     * @link [Font:getBaseline](https://love2d.org/wiki/Font:getBaseline)
     */
    get base_line(){return this.font.getBaseline()}

    /**
     * Gets the DPI scale factor of the Font.
     * @link [Font:getDPIScale](https://love2d.org/wiki/Font:getDPIScale)
     */
    get dpi_scale(){return this.font.getDPIScale()}

    /**
     * Gets the descent of the Font. The descent spans the distance between the
     * baseline and the lowest descending glyph in a typeface.
     * @link [Font:getDescent](https://love2d.org/wiki/Font:getDescent)
     */
    get descent(){return this.font.getDescent()}

    /**
     * Gets the height of the Font. The height of the font is the size including any
     * spacing; the height which it will need.
     * @return height, The height of the Font in pixels.
     * @link [Font:getHeight](https://love2d.org/wiki/Font:getHeight)
     */
    get height(){return this.font.getHeight()}

    /**
     * This will be the value previously set by Font:setLineHeight, or 1.0 by default.
     * @link [Font:getLineHeight](https://love2d.org/wiki/Font:getLineHeight)
     */
    get line_height(){return this.font.getLineHeight()}
    set line_height(h: number){this.font.setLineHeight(h)}

    /**
     * The filter minifying mode for a font.
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_minify(){
        return this.__filter_minify
    }
    set filter_minify(min: FilterMode){
        this.__filter_minify = min
        this.font.setFilter(this.__filter_minify, this.__filter_magnify, this.__filter_anosotropy)
    }

    /**
     * The filter magnifying mode for a font.
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_magnify(){
        return this.__filter_magnify
    }
    set filter_magnify(mag: FilterMode){
        this.__filter_magnify = mag
        this.font.setFilter(this.__filter_minify, this.__filter_magnify, this.__filter_anosotropy)
    }

    /**
     * Maximum amount of anisotropic filtering used.
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_anisotropy(){
        return this.__filter_anosotropy
    }
    set filter_anisotropy(amount: number){
        this.__filter_anosotropy = amount
        this.font.setFilter(this.__filter_minify, this.__filter_magnify, this.__filter_anosotropy)
    }

    /**
     * When the Font doesn't contain a glyph, it will
     * substitute the glyph from the next subsequent fallback Fonts. This is akin to
     * setting a "font stack" in Cascading Style Sheets (CSS).
     *
     * @param fallbackfonts The fallback fonts in order
     * @param ... Additional fallback Fonts.
     * @link [Font:setFallbacks](https://love2d.org/wiki/Font:setFallbacks)
     * @since 0.10.0
     */
    get fallbacks(){
        let copy: LoveFont[] = []
        for (let i = 0; i < this.__fallbacks.length; i++){
            copy.push(this.__fallbacks[i])
        }
        return copy
    }
    set fallbacks(list: LoveFont[]){
        this.__fallbacks = []
        for (let i = 0; i < list.length; i++){
            this.__fallbacks.push(list[i])
        }
        this.font.setFallbacks(...this.__fallbacks)
    }


    /**
     * Gets LoveLua font object.
     * @link [Font](https://love2d.org/wiki/Font)
     */
    readonly font: LoveFont

    private __filter_minify: FilterMode
    private __filter_magnify: FilterMode
    private __filter_anosotropy: number
    private __fallbacks: LoveFont[]
}