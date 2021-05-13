export * from './Channel'
export * from './Thread'
export * from './ThreadFile'
export * from './Utils'

import * as TestThreadedFile from './Test/TestThreadedFile'
import { ThreadFile } from './ThreadFile'

export const TestThreaded: ThreadFile.Input<[number]> = TestThreadedFile