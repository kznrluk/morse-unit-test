import { TestResult } from '../Result/ResultObject';

export interface TestStatics {
    assertions: number;
    passed: number;
    failed: number;
    unsafe: number;
    error: number;
    allTestResult: TestResult[]
}
