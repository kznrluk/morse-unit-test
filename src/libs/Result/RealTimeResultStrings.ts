import { ResultCode } from './ResultCode';

export const RealTimeResultStrings: { [ T in ResultCode ]: string } = {
    [ResultCode.PASSED]: '.',
    [ResultCode.FAILED]: '\x1b[35mF\x1b[0m',
    [ResultCode.ERROR]: '\x1b[41mE\x1b[0m',
    [ResultCode.UNSAFE]: 'U',
};
