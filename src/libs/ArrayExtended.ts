import { ResultObject } from './Result/ResultObject';
import { outputRealTimeResultString } from './ConsoleOut/RealTimeResult';

export class ArrayWithRealTimeOutput extends Array<ResultObject> {
    push(result: ResultObject) {
        outputRealTimeResultString(result.resultCode);
        return super.push(result);
    }
}
