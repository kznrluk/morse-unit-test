import { TestObject } from './libs/types/TestObject';
import * as CONFIG from './libs/config';
import { TestResult } from './libs/Result/ResultObject';
import { ConsoleOutResults } from './libs/ConsoleOut/ConsoleOutResults';
import { test } from './libs/Test';
import { ResultCode } from './libs/Result/ResultCode';
import { TestStatics } from './libs/types/TestStatics';

export const doTest = async (testObjects: TestObject): Promise<TestStatics> => {
    console.log(CONFIG.OPENING_MESSAGE);

    console.log('\n+------------------- RESULT -------------------+');
    const testEntries = Object.entries(testObjects);
    const resultObjects: TestResult[] = await Promise.all(testEntries.map(test));
    console.log('\n+----------------------------------------------+');
    const allAssertions = resultObjects.map((e) => e.results).flat();
    const passed = allAssertions.filter((e) => e.resultCode === ResultCode.PASSED).length;
    const unsafe = allAssertions.filter((e) => e.resultCode === ResultCode.UNSAFE).length;
    const failed = allAssertions.filter((e) => e.resultCode === ResultCode.FAILED).length;
    const error = allAssertions.filter((e) => e.resultCode === ResultCode.ERROR).length;

    const testStatics = {
        'assertions': allAssertions.length,
        passed,
        unsafe,
        failed,
        error,
        'allTestResult': resultObjects,
    };

    ConsoleOutResults(testStatics);

    process.exitCode = testStatics.passed === testStatics.assertions ? 0 : 1;
    return testStatics;
};
