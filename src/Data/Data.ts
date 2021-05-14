import type { Data as LoveData,
              DataTypes as LoveDataTypes } from 'love.data'

import { Object } from '../Utils'

export abstract class Data extends Object {

    /**
     * FFI pointer to the Data.
     *
     * This function should be preferred instead of Data:getPointer because the latter uses light userdata which can't store more all possible memory addresses on some new ARM64 architectures, when LuaJIT is used.
     * @since 11.3
     */
    get pointer(){
        return this.data.getFFIPointer()
    }


    /**
     * Gets the size of the Data in bytes.
     * 
     * @link [Data:getSize](https://love2d.org/wiki/Data:getSize)
     */
    get size(){
        return this.data.getSize()
    }

    /**
     * Gets the full Data as a string.
     * 
     * @link [Data:getString](https://love2d.org/wiki/Data:getString)
     * @since 0.9.0
     */
    get bytes(){
        return this.data.getString()
    }

    abstract data: LoveData<LoveDataTypes>
}