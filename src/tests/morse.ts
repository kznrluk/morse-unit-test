import { Assert } from '../libs/types/Assert';
import { doTest } from '../Morse';

const timeOut = (n: number) => new Promise((res) => setTimeout(() => res('done'), n));

const tests = {
    'Passed by boolean': (assert: Assert) => {
        assert(true);
    },

    'Failed by boolean': (assert: Assert) => {
        assert(false);
    },

    'Passed by assertion': (assert: Assert) => {
        assert(1, 1);
        assert('aaa', 'aaa');
    },

    'Failed by assertion': (assert: Assert) => {
        assert(1, 2);
        assert('aaa', 'bbb');
    },

    'Error by throw': () => {
        throw new Error('Error message here');
    },

    'Unsafe test': () => {
        //
    },

    'Break line': (assert: Assert) => {
        [...Array(25)].forEach(() => assert(true));
    },

    'Test with async': async (assert: Assert) => {
        const result = await timeOut(1000);
        assert('done', result);
    },

    'Async failed by error': async () => {
        await timeOut(500);
        throw new Error('Error message here');
    },

    'Test with Promise': (assert: Assert) => new Promise<void>((res) => {
        timeOut(500).then((result) => {
            assert('done', result);
            res(undefined);
        });
    }),
};

doTest(tests);
