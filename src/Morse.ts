import { TestObject } from './libs/types/TestObject';
import * as CONFIG from './libs/config';
import { ResultObject, TestResult } from './libs/Result/ResultObject';
import { ConsoleOutResults } from './libs/ConsoleOut/ConsoleOutResults';
import { test } from './libs/Test';

export const doTest = async (testObjects: TestObject) => {
    console.log(CONFIG.OPENING_MESSAGE);
    console.log(CONFIG.MORSE);

    console.log('\n-------------------- RESULT --------------------');
    const testEntries = Object.entries(testObjects);
    const resultObjects: TestResult[] = await Promise.all(testEntries.map(test));
    console.log('\n------------------------------------------------');

    ConsoleOutResults(resultObjects);
    return resultObjects;
};
