import { Type } from 'love'

const LINUX = string.sub(_G.package.config, 1, 1) == '/'

type AvailableTable = {
    [key: number]: ThreadData
}
export type ThreadData = undefined | void | boolean | number | string | Type | AvailableTable


export function getCoresCount(){
    if (LINUX){
        return getCoreCountLinux()
    } else {
        // TODO
        // return tonumber(os.getenv("NUMBER_OF_PROCESSORS"))
        return 1
    }

}

function getCoreCountLinux(){
    let [res, err] = io.popen('echo "$(grep -c processor /proc/cpuinfo)"')
    if (!res){
        throw 'Can not get CPU cores count: ' + err
    }

    let s_count = res.read('n')
    if (!s_count){
        throw 'Can not read CPU cores count'
    }
    // print(s_count, s_count.charCodeAt(0))

    let count = tonumber(s_count)
    if (!count){
        throw 'Can not get CPU cores count from string'
    }

    return count
}