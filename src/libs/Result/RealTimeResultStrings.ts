import { ResultCode } from './ResultCode';
import { CONSOLE_FORMAT } from '../config';

export const RealTimeResultStrings: { [ T in ResultCode ]: string } = {
    [ResultCode.PASSED]: '.',
    [ResultCode.FAILED]: `${CONSOLE_FORMAT.MAGENTA}F${CONSOLE_FORMAT.END}`,
    [ResultCode.ERROR]: `${CONSOLE_FORMAT.RED_BG}E${CONSOLE_FORMAT.END}`,
    [ResultCode.UNSAFE]: `${CONSOLE_FORMAT.BLUE}U${CONSOLE_FORMAT.END}`,
};
