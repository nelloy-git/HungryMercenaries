import type { CompareMode,
              FilterMode,
              Texture as LoveTexture,
              TextureType,
              WrapMode} from 'love.graphics'
import type { PixelFormat } from 'love.image'

import { Vec2 } from '../../Math';

import { StdWidget } from "./Std";

export abstract class Texture extends StdWidget {
    
    /**
     * DPI scale factor of the Texture.
     * 
     * @link [Texture:getDPIScale](https://love2d.org/wiki/Texture:getDPIScale)
     */
    get dpi_scale(){return this._drawable.getDPIScale()}

    /**
     * Depth of a Volume Texture. Returns 1 for 2D, Cubemap, and Array
     * textures.
     *
     * @link [Texture:getDepth](https://love2d.org/wiki/Texture:getDepth)
     */
    get depth(){return this._drawable.getDepth()}

    /**
     * Comparison mode used when sampling from a depth texture in a shader.
     * 
     * @link [Texture:getDepthSampleMode](https://love2d.org/wiki/Texture:getDepthSampleMode)
     */
    get depth_sample_mode(){
        return this._drawable.getDepthSampleMode()
    }

    set depth_sample_mode(mode: CompareMode | undefined){
        this._drawable.setDepthSampleMode(<CompareMode>mode)
    }

    /**
     * Width and height of the Texture.
     *
     * @link [Texture:getDimensions](https://love2d.org/wiki/Texture:getDimensions)
     */
    get pixel_size(){
        let [w, h] = this._drawable.getDimensions()
        return new Vec2(w, h)
    }

    /**
     * Filter minifying mode for a font.
     * 
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_minify(){
        let [min, mag] = this._drawable.getFilter()
        return min
    }

    set filter_minify(min: FilterMode){
        let mag = this.filter_magnify
        this._drawable.setFilter(min, mag)
    }

    /**
     * Filter magnifying mode for a font.
     * 
     * @link [Font:getFilter](https://love2d.org/wiki/Font:getFilter)
     */
    get filter_magnify(){
        let [min, mag] = this._drawable.getFilter()
        return mag
    }

    set filter_magnify(mag: FilterMode){
        let min = this.filter_minify
        this._drawable.setFilter(min, mag)
    }

    /**
     * PixelFormat of the Texture.
     *
     * @link [Texture:getFormat](https://love2d.org/wiki/Texture:getFormat)
     */
    get pixel_format(){return this._drawable.getFormat()}

    /**
     * Number of layers / slices in an Array Texture. Returns 1 for 2D,
     * Cubemap, and Volume textures.
     *
     * @link [Texture:getLayerCount](https://love2d.org/wiki/Texture:getLayerCount)
     */
    get layer_count(){return this._drawable.getLayerCount()}

    /**
     * Number of mipmaps contained in the Texture. If the texture was not
     * created with mipmaps, it will return 1.
     *
     * @link [Texture:getMipmapCount](https://love2d.org/wiki/Texture:getMipmapCount)
     */
    get mipmap_count(){return this._drawable.getMipmapCount()}

    /**
     * Mipmap filter mode for a Texture. Prior to 11.0 this method only worked on Images.
     * 
     * @link [Texture:getMipmapFilter](https://love2d.org/wiki/Texture:getMipmapFilter)
     */
    get mipmap_filter(){
        let [filter, sharp] = this._drawable.getMipmapFilter()
        return filter
    }

    set mipmap_filter(filter: FilterMode){
        let sharp = this.mipmap_sharpness
        this._drawable.setMipmapFilter(filter, sharp)
    }

    /**
     * Value used to determine whether the image should use more or less detailed mipmap levels than normal when drawing.
     * 
     * @link [Texture:getMipmapFilter](https://love2d.org/wiki/Texture:getMipmapFilter)
     */
    get mipmap_sharpness(){
        let [filter, sharp] = this._drawable.getMipmapFilter()
        return sharp
    }

    set mipmap_sharpness(sharp: number){
        let filter = this.mipmap_filter
        this._drawable.setMipmapFilter(filter, sharp)
    }

    /**
     * Type of the Texture.
     *
     * @link [Texture:getTextureType](https://love2d.org/wiki/Texture:getTextureType)
     */
    get texture_type(){
        return this._drawable.getTextureType()
    }

    /**
     * Horizontal wrapping mode of the texture.
     * 
     * @link [Texture:getWrap](https://love2d.org/wiki/Texture:getWrap)
     */
    get wrap_horiz(){
        let [horiz, vert] = this._drawable.getWrap()
        return horiz
    }

    set wrap_horiz(horiz: WrapMode){
        let vert = this.wrap_vert
        this._drawable.setWrap(horiz, vert)
    }

    /**
     * Vertical wrapping mode of the texture.
     * 
     * @link [Texture:getWrap](https://love2d.org/wiki/Texture:getWrap)
     */
    get wrap_vert(){
        let [horiz, vert] = this._drawable.getWrap()
        return vert
    }

    set wrap_vert(vert: WrapMode){
        let horiz = this.wrap_horiz
        this._drawable.setWrap(horiz, vert)
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
    get readable(){return this._drawable.isReadable()}

    protected abstract _drawable: LoveTexture
}