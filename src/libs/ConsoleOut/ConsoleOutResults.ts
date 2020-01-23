import { ResultObject } from '../Result/ResultObject';
import { ResultCode } from '../Result/ResultCode';
import { TestStatics } from '../types/TestStatics';
import { CONSOLE_FORMAT } from './Format';

/* eslint-disable consistent-return */
const createMessageHeader = (code: ResultCode) => {
    if (code === ResultCode.ERROR) return `${CONSOLE_FORMAT.RED_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
    if (code === ResultCode.FAILED) return `${CONSOLE_FORMAT.MAGENTA_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
    if (code === ResultCode.UNSAFE) return `${CONSOLE_FORMAT.BLUE_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
};

const createMessage = (result: ResultObject) => {
    if (result.resultCode === ResultCode.ERROR) return result.error!.toString();
    if (result.resultCode === ResultCode.UNSAFE) return 'No valid tests have been run in the function.';
    if (result.arguments && result.arguments.length === 1) return `Failed asserting that true is expected ${result.arguments[0]}.`;
    if (result.arguments && result.arguments.length === 2) return `Failed asserting that '${result.arguments[1]}' is expected '${result.arguments[0]}'.`;
};

const createStaticsText = (tests: number, assertions: number, passed: number, failures: number, error: number, unsafe: number) =>
    `Tests: ${tests}, Assertions: ${assertions}, Passed: ${passed} Failures: ${failures}, Errors: ${error}, Unsafe: ${unsafe}`;

export const ConsoleOutResults = (statics: TestStatics): void => {
    if (statics.failed || statics.error) {
        console.log(`\nThere were ${statics.failed} failures and ${statics.error} errors:\n`);
        statics.allTestResult.forEach((r) => {
            r.results.forEach((e) => {
                if (e.resultCode !== ResultCode.PASSED) {
                    console.log(`${createMessageHeader(e.resultCode)} - ${r.name}`);
                    console.log(`${''.padEnd(8, ' ')}   ${createMessage(e)}\n`);
                }
            });
        });
    }

    console.log(createStaticsText(statics.allTestResult.length, statics.assertions, statics.passed, statics.failed, statics.error, statics.unsafe));
};
