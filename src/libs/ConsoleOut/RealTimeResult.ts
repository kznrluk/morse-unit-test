import { ResultCode } from '../Result/ResultCode';
import { RealTimeResultStrings } from '../Result/RealTimeResultStrings';

let outputRealTimeCount = 0;
export const outputRealTimeResultString = (result: ResultCode) => {
    process.stdout.write(RealTimeResultStrings[result] + ' ');
    outputRealTimeCount += 1;
    if (outputRealTimeCount % 24 === 0) console.log();
};
