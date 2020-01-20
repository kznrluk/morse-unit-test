import { Assert } from '../libs/types/Assert';
import { doTest } from '../Morse';

const timeOut = (n: number) => new Promise((res) => setTimeout(() => res('done'), n));

const tests = {
    'passWithBoolean': (assert: Assert) => {
        assert(true);
    },

    'failedWithBoolean': (assert: Assert) => {
        assert(false);
    },

    'passWithAssertion': (assert: Assert) => {
        assert(1, 1);
        assert('aaa', 'aaa');
    },

    'failedWithAssertion': (assert: Assert) => {
        assert(1, 2);
        assert('aaa', 'bbb');
    },

    'errorWithThrow': () => {
        throw new Error('Message hogehoge');
    },

    'unsafe': () => {
        //
    },

    'breakLine': (assert: Assert) => {
        [...Array(25)].forEach(() => assert(true));
    },

    'async': async (assert: Assert) => {
        const result = await timeOut(1000);
        assert('done', result);
    },

    'asyncError': async () => {
        await timeOut(500);
        throw new Error('message');
    },

    'promise': (assert: Assert) => new Promise<void>((res) => {
        timeOut(500).then((result) => {
            assert('done', result);
            res(undefined);
        });
    }),
};

doTest(tests);
