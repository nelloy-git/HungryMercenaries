import type { FileData as LoveFileData } from 'love.filesystem'

import { Data } from './Data'

const newLoveFileData = love.filesystem.newFileData

export class FileData extends Data {
    constructor(path: string)
    constructor(data: LoveFileData)
    constructor(content: string, name: string)
    constructor(path_or_content: string | LoveFileData, name?: string){
        super()

        if (typeof path_or_content !== 'string'){
            this.path = ''
            this.data = path_or_content
        } else if (name){
            this.path = ''
            this.data = newLoveFileData(path_or_content, <string>name)
        } else {
            let path = path_or_content
            let data = FileData.__loaded.get(path)
            if (!data){
                let [file, err] = newLoveFileData(path)
                if (err){
                    throw err
                }
                data = <LoveFileData>file
                FileData.__loaded.set(path, data)
            }

            this.path = path
            this.data = data.clone()
        }
    }

    release(){
        this.data.release()
    }

    get extension(){
        return this.data.getExtension()
    }

    get name(){
        return this.data.getFilename()
    }

    readonly path: string
    data: LoveFileData

    private static __loaded = new Map<string, LoveFileData>()
}