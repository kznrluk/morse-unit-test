import { ResultObject, TestResult } from '../Result/ResultObject';
import { ResultCode } from '../Result/ResultCode';
import { CONSOLE_FORMAT } from '../config';

const createMessageHeader = (code: ResultCode) => {
    if (code === ResultCode.ERROR) return `${CONSOLE_FORMAT.RED_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
    if (code === ResultCode.FAILED) return `${CONSOLE_FORMAT.MAGENTA_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
    if (code === ResultCode.UNSAFE) return `${CONSOLE_FORMAT.BLUE_BG} ${ResultCode[code].padEnd(7, ' ')}${CONSOLE_FORMAT.END}`;
}

const createMessage = (result: ResultObject) => {
    if (result.resultCode === ResultCode.ERROR) return result.error!.toString();
    if (result.resultCode === ResultCode.UNSAFE) return 'No valid tests have been run in the function.';
    if (result.arguments && result.arguments.length === 1) return `Failed asserting that true is expected ${result.arguments[0]}.`;
    if (result.arguments && result.arguments.length === 2) return `Failed asserting that '${result.arguments[1]}' is expected '${result.arguments[0]}'.`;
};

const createStaticsText = (tests: number, assertions: number, failtures: number) =>
    `Tests: ${tests}, Assertions: ${assertions}, Failures: ${failtures}.`;

export const ConsoleOutResults = (results: TestResult[]): void => {
    const allAssertions = results.map(e => e.results).flat();
    const passedCount = allAssertions.filter(e => e.resultCode === ResultCode.PASSED).length;
    const failedCount = allAssertions.length - passedCount;

    if (failedCount) {
        process.exitCode = 1;
        console.log(`\nThere were ${failedCount} failures:\n`)
        results.forEach(r => {
            r.results.forEach(e => {
                if (e.resultCode !== ResultCode.PASSED) {
                    console.log(`${createMessageHeader(e.resultCode)} - ${r.name}`);
                    console.log(`${''.padEnd(8, ' ')}   ${createMessage(e)}\n`);
                }
            })
        });
    }

    console.log(createStaticsText(results.length, allAssertions.length, failedCount));
};
