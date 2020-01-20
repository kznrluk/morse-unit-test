import { ResultObject, TestResult } from './Result/ResultObject';
import { Assert } from './types/Assert';
import { ResultCode } from './Result/ResultCode';
import { ArrayWithRealTimeOutput } from './ArrayExtended';

const createAssertFunction = (results: ResultObject[]): Assert => (a, b): void => {
    if (a !== undefined && b !== undefined) {
        results.push({
            'resultCode': a === b ? ResultCode.PASSED : ResultCode.FAILED,
            'arguments': [a, b],
        });
    } else if (typeof a === 'boolean' && b === undefined) {
        results.push({
            'resultCode': a ? ResultCode.PASSED : ResultCode.FAILED,
            'arguments': [a],
        });
    } else {
        results.push({ 'resultCode': ResultCode.UNSAFE });
    }
};

export const test = async ([name, testFunc]: [string, (assert: Assert) => void]): Promise<TestResult> => {
    const results: ResultObject[] = new ArrayWithRealTimeOutput();

    try {
        await testFunc(createAssertFunction(results));
    } catch (e) {
        results.push({
            'resultCode': ResultCode.ERROR, 'error': e,
        });
    }

    if (!results.length) {
        results.push({
            'resultCode': ResultCode.UNSAFE,
        });
    }

    return { name, results };
};
