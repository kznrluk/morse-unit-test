import { Assert } from './Assert';

export type TestObject = { [s: string]: (assert: Assert) => void | Promise<void> };
