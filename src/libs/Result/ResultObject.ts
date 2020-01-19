import { ResultCode } from './ResultCode';

export interface ResultObject {
    resultCode: ResultCode,
    arguments?: unknown[],
    error?: Error,
}

export interface TestResult {
    name: string,
    results: ResultObject[]
}
