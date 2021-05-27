export class Iterator<T> {
    constructor(data: T){
        this.data = data
    }

    data: T
    next: T | undefined
    prev: T | undefined
}

export class SortedList<T> {
    constructor(weight: (this: void, obj: T) => number){
        this.__list = []
        this.__weight = weight
        this.__comp = (obj1: T, obj2: T) => {
            return weight(obj1) - weight(obj2)
        }
    }

    add(obj: T){
        this.__list.push(obj)
        this.__list.sort(this.__comp)
    }   

    remove(obj: T){
        let found = this.__list.indexOf(obj)
        if (found < 0){
            return false
        }
        this.__list.splice(found)
        return true
    }

    [Symbol.iterator](){
        let counter = -1
        return {
            next: () => {
                counter++
                return {
                    done: counter === this.__list.length,
                    value: this.__list[counter]
                }
            }
        }
    }

    ascending(func: (this: void, obj: T) => void){
        for (let i = 0; i < this.__list.length; i++){
            func(this.__list[i])
        }
    }

    descending(func: (this: void, obj: T) => void){
        for (let i = this.__list.length; i >= 0 ; i--){
            func(this.__list[i])
        }
    }

    get weight(){
        return this.__weight
    }

    set weight(func: (obj: T) => number){
        this.__weight = func
        
        this.__comp = (obj1: T, obj2: T) => {
            return func(obj1) - func(obj2)
        }
    }
    
    private __list: T[]
    private __weight: (this: void, obj: T) => number
    private __comp: (obj1: T, obj2: T) => number
}