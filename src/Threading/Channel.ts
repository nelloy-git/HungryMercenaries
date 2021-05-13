import { Channel as LoveChannel, getChannel as getLoveChannel } from 'love.thread'

import { Object } from '../Utils'
import { ThreadData } from './Utils'

export class Channel<T extends ThreadData> extends Object {
    constructor(name: string){
        super()
        this.name = name
        this.__channel = getLoveChannel(name)
    }

    destroy(){
        this.__channel.release()
    }

    /**
     * Executes the specified function atomically with respect to this Channel.
     *
     * Calling multiple methods in a row on the same Channel is often useful. However
     * if multiple Threads are calling this Channel's methods at the same time, the
     * different calls on each Thread might end up interleaved (e.g. one or more of
     * the second thread's calls may happen in between the first thread's calls.)
     *
     * This method avoids that issue by making sure the Thread calling the method has
     * exclusive access to the Channel until the specified function has returned.
     *
     * @param func The export function to call, the form of function(channel, arg1, arg2, ...) end. The Channel is passed as the first argument to the function when it is called.
     * @param arg1 Additional arguments that the given function will receive when it is called.
     * @param ... Additional arguments that the given function will receive when it is called.
     * @return ret1, The first return value of the given export function (if any.)
     * @return ..., Any other return values.
     * @tupleReturn
     * @link [Channel:performAtomic](https://love2d.org/wiki/Channel:performAtomic)
     */
    atomic<T extends (this: void, ...args: any[]) => any[]>(func: T, ...args: Parameters<T>){
        return this.__channel.performAtomic(func, ...args)
    }

    /**
     * Clears all the messages in the Channel queue.
     *
     * @link [Channel:clear](https://love2d.org/wiki/Channel:clear)
     */
    clear(){
        this.__channel.clear()
    }

    /**
     * Retrieves the value of a Channel message, but leaves it in the queue.
     *
     * It returns _nil/undefined_ if there's no message in the queue.
     *
     * @return value, The contents of the message.
     * @link [Channel:peek](https://love2d.org/wiki/Channel:peek)
     */
    peek(){
        return <T | undefined>this.__channel.peek()
    }

    /**
     * Retrieves the value of a Channel message and removes it from the message queue.
     *
     * It returns _nil/undefined_ if there are no messages in the queue.
     *
     * @return value, The contents of the message.
     * @link [Channel:pop](https://love2d.org/wiki/Channel:pop)
     */
    pop(){
        return <T | undefined>this.__channel.pop()
    }

    /**
     * Send a message to the thread Channel.
     *
     * See any for the list of supported types.
     *
     * @param value The contents of the message.
     * @link [Channel:push](https://love2d.org/wiki/Channel:push)
     */
    push(data: T){
        this.__channel.push(data)
    }

    /**
     * Retrieves the value of a Channel message and removes it from the message queue.
     *
     * It waits until a message is in the queue then returns the message value.
     *
     * @param timeout The maximum amount of time to wait.
     * @return value, The contents of the message or _nil/undefined_ if the timeout expired.
     * @link [Channel:demand](https://love2d.org/wiki/Channel:demand)
     */
    demand(): T
    demand(timeout: number): T | undefined
    demand(timeout?: number){
        return this.__channel.demand(<number>timeout)
    }

    /**
     * Send a message to the thread Channel and wait for a thread to accept it.
     *
     * See any for the list of supported types.
     *
     * @param value The contents of the message.
     * @param timeout The maximum amount of time to wait.
     * @return success, Whether the message was successfully supplied before the timeout expired.
     * @link [Channel:supply](https://love2d.org/wiki/Channel:supply)
     */
    supply(data: T): true
    supply(data: T, timeout: number): boolean
    supply(data: T, timeout?: number){
        return this.__channel.supply(data, <number>timeout)
    }

    /**
     * Retrieves the number of messages in the thread Channel queue.
     *
     * @return count, The number of messages in the queue.
     * @link [Channel:getCount](https://love2d.org/wiki/Channel:getCount)
     */
    get length(){
        return this.__channel.getCount()
    }

    readonly name: string
    private __channel: LoveChannel
}