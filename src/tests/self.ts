import { Assert } from '../libs/types/Assert';
import { doTest } from '../Morse';

const test = {
    'One Failed': async (assert: Assert) => {
        const mock = { 'failed': (assert: Assert) => assert(false) };
        const result = await doTest(mock);
        assert(1, result.failed);
    },

    'allPassed': async (assert: Assert) => {
        const mock = {
            'pass_one': (assert: Assert) => assert(true),
            'pass_two': (assert: Assert) => assert(true),
            'pass_three': (assert: Assert) => assert(true),
        };

        const result = await doTest(mock);
        assert(3, result.assertions);
        assert(3, result.passed);
        assert(0, result.error);
        assert(0, result.unsafe);
        assert(0, result.error);
    },
};

doTest(test);
