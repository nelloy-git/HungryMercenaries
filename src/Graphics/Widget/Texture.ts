import type { CompareMode as LoveCompareMode,
              FilterMode as LoveFilterMode,
              Texture as LoveTexture,
              TextureType as LoveTextureType,
              WrapMode as LoveWrapMode} from 'love.graphics'
import type { PixelFormat as LovePixelFormat } from 'love.image'

import { Vec2 } from '../../Math';

import { Widget } from "../Widget";

export abstract class Texture extends Widget {
    
    /**
     * DPI scale factor of the Texture.
     * 
     * @link [Texture:getDPIScale](https://love2d.org/wiki/Texture:getDPIScale)
     */
    get dpi_scale(){return this.drawable ? this.drawable.getDPIScale() : -1}

    /**
     * Depth of a Volume Texture. Returns 1 for 2D, Cubemap, and Array
     * textures.
     *
     * @link [Texture:getDepth](https://love2d.org/wiki/Texture:getDepth)
     */
    get depth(){return this.drawable ? this.drawable.getDepth() : -1}

    /**
     * Comparison mode used when sampling from a depth texture in a shader.
     * 
     * @link [Texture:getDepthSampleMode](https://love2d.org/wiki/Texture:getDepthSampleMode)
     */
    get depth_sample_mode(): Texture.CompareMode {
        let mode = this.drawable ? this.drawable.getDepthSampleMode() : <Texture.CompareMode>'null'
        mode = mode ? mode : 'null'

        return mode
    }

    set depth_sample_mode(mode: Texture.CompareMode){
        if (this.drawable){
            if (mode == 'null'){
                this.drawable.setDepthSampleMode(<LoveCompareMode><unknown>undefined)
            } else {
                this.drawable.setDepthSampleMode(mode)
            }
            
        }
    }

    /**
     * Width and height of the Texture.
     *
     * @link [Texture:getDimensions](https://love2d.org/wiki/Texture:getDimensions)
     */
    get dimentions(){
        let [w, h] = this.drawable ? this.drawable.getDimensions() : [-1, -1]
        return new Vec2(w, h)
    }

    /**
     * Filter minifying mode for a font.
     * 
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_minify(): Texture.FilterMode{
        let [min, mag] = this.drawable ?
                            this.drawable.getFilter()
                            : ['null', 'null']
        return <Texture.FilterMode>min
    }

    set filter_minify(min: Texture.FilterMode){
        let mag = this.filter_magnify
        if (this.drawable && min != 'null' && mag != 'null'){
            this.drawable.setFilter(min, mag)
        }
    }

    /**
     * Filter magnifying mode for a font.
     * 
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_magnify(): Texture.FilterMode{
        let [min, mag] = this.drawable ?
                            this.drawable.getFilter()
                            : ['null', 'null']
        return <Texture.FilterMode>mag
    }

    set filter_magnify(mag: Texture.FilterMode){
        let min = this.filter_minify
        if (this.drawable && min != 'null' && mag != 'null'){
            this.drawable.setFilter(min, mag)
        }
    }

    /**
     * PixelFormat of the Texture.
     *
     * @link [Texture:getFormat](https://love2d.org/wiki/Texture:getFormat)
     */
    get pixel_format(): Texture.PixelFormat{
        return this.drawable ? this.drawable.getFormat() : 'null'
    }

    /**
     * Number of layers / slices in an Array Texture. Returns 1 for 2D,
     * Cubemap, and Volume textures.
     *
     * @link [Texture:getLayerCount](https://love2d.org/wiki/Texture:getLayerCount)
     */
    get layer_count(){return this.drawable ? this.drawable.getLayerCount() : -1}

    /**
     * Number of mipmaps contained in the Texture. If the texture was not
     * created with mipmaps, it will return 1.
     *
     * @link [Texture:getMipmapCount](https://love2d.org/wiki/Texture:getMipmapCount)
     */
    get mipmap_count(){return this.drawable ? this.drawable.getMipmapCount() : -1}

    /**
     * Mipmap filter mode for a Texture. Prior to 11.0 this method only worked on Images.
     * 
     * @link [Texture:getMipmapFilter](https://love2d.org/wiki/Texture:getMipmapFilter)
     */
    get mipmap_filter(): Texture.FilterMode{
        let [filter, sharp] = this.drawable ?
                                this.drawable.getMipmapFilter()
                                : ['linear', -1]
        return <Texture.FilterMode>filter
    }

    set mipmap_filter(filter: Texture.FilterMode){
        if (this.drawable && filter != 'null'){
            let sharp = this.mipmap_sharpness
            this.drawable.setMipmapFilter(filter, sharp)
        }

    }

    /**
     * Value used to determine whether the image should use more or less detailed mipmap levels than normal when drawing.
     * 
     * @link [Texture:getMipmapFilter](https://love2d.org/wiki/Texture:getMipmapFilter)
     */
    get mipmap_sharpness(){
        let [filter, sharp] = this.drawable ?
                                this.drawable.getMipmapFilter()
                                : ['linear', -1]
        return sharp
    }

    set mipmap_sharpness(sharp: number){
        let filter = this.mipmap_filter
        if (this.drawable && filter != 'null'){
            this.drawable.setMipmapFilter(filter, sharp)
        }
    }

    /**
     * Type of the Texture.
     *
     * @link [Texture:getTextureType](https://love2d.org/wiki/Texture:getTextureType)
     */
    get texture_type(): Texture.TextureType{
        return this.drawable ? this.drawable.getTextureType() : 'null'
    }

    /**
     * Horizontal wrapping mode of the texture.
     * 
     * @link [Texture:getWrap](https://love2d.org/wiki/Texture:getWrap)
     */
    get wrap_horiz(){
        let [horiz, vert] = this.drawable ? 
                                this.drawable.getWrap()
                                : ['null', 'null']
        return <Texture.WrapMode>horiz
    }

    set wrap_horiz(horiz: Texture.WrapMode){
        let vert = this.wrap_vert
        if (this.drawable && horiz != 'null' && vert != 'null'){
            this.drawable.setWrap(horiz, vert)
        }
    }

    /**
     * Vertical wrapping mode of the texture.
     * 
     * @link [Texture:getWrap](https://love2d.org/wiki/Texture:getWrap)
     */
    get wrap_vert(){
        let [horiz, vert] = this.drawable ? 
                                this.drawable.getWrap()
                                : ['null', 'null']
        return <Texture.WrapMode>vert
    }

    set wrap_vert(vert: Texture.WrapMode){
        let horiz = this.wrap_horiz
        if (this.drawable && horiz != 'null' && vert != 'null'){
            this.drawable.setWrap(horiz, vert)
        }
    }

    /**
     * Gets whether the Texture can be drawn and sent to a Shader.
     *
     * Canvases created with stencil and/or depth PixelFormats are not readable by
     * default, unless readable=true is specified in the settings table passed into
     * love.graphics.newCanvas.
     *
     * Non-readable Canvases can still be rendered to.
     *
     * @link [Texture:isReadable](https://love2d.org/wiki/Texture:isReadable)
     */
    get readable(){return this.drawable ? this.drawable.isReadable() : false}

    abstract drawable: LoveTexture
}

export namespace Texture {
    export type CompareMode = LoveCompareMode | 'null'
    export type FilterMode = LoveFilterMode | 'null'
    export type PixelFormat = LovePixelFormat | 'null'
    export type TextureType = LoveTextureType | 'null'
    export type WrapMode = LoveWrapMode | 'null'
}