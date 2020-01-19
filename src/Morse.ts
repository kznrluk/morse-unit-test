import { TestObject } from './libs/types/TestObject';
import { VERSION } from './libs/config';
import { Assert } from './libs/types/Assert';
import { ResultObject, TestResult } from './libs/Result/ResultObject';
import { ResultCode } from './libs/Result/ResultCode';
import { RealTimeResultStrings } from './libs/Result/RealTimeResultStrings';
import { ConsoleOutResults } from './libs/ConsoleOut/ConsoleOutResults';

let outputRealTimeCount = 0;
const outputRealTimeResultString = (result: ResultCode) => {
    process.stdout.write(RealTimeResultStrings[result] + ' ');
    outputRealTimeCount += 1;
    if (outputRealTimeCount % 24 === 0) console.log();
};

const createResultArray = () => (
    new class extends Array<ResultObject> {
        push(result: ResultObject) {
            outputRealTimeResultString(result.resultCode);
            return super.push(result);
        }
    }
);

const createAssertFunction = (results: ResultObject[]): Assert => (a, b): void => {
    if (a !== undefined && b !== undefined) {
        results.push({
            resultCode: a === b ? ResultCode.PASSED : ResultCode.FAILED,
            arguments: [a, b]
        })
    } else if (typeof a === 'boolean' && b === undefined) {
        results.push({
            resultCode: a ? ResultCode.PASSED : ResultCode.FAILED,
            arguments: [a]
        });
    } else {
        results.push({ resultCode: ResultCode.UNSAFE });
    }
};

const test = async ([name, testFunc]: [string, (assert: Assert) => void]): Promise<TestResult> => {
    const results: ResultObject[] = createResultArray();

    try {
        await testFunc(createAssertFunction(results));
    } catch (e) {
        results.push({
            resultCode: ResultCode.ERROR, error: e,
        });
    }

    if (!results.length) {
        results.push({
            resultCode: ResultCode.UNSAFE
        });
    }

    return { name, results };
};

export const doTest = async (testObjects: TestObject) => {
    console.log(`            Morse Test Runner ${VERSION}`);
    console.log('-- --- .-. ... .  - . ... -  .-. ..- -. -. . .-. ');
    console.log('\n-------------------- RESULT --------------------');
    const testEntries = Object.entries(testObjects);
    const resultObjects: TestResult[] = await Promise.all(testEntries.map(test));
    console.log('\n------------------------------------------------');
    ConsoleOutResults(resultObjects);
    console.log('Done.');
    return resultObjects;
};
