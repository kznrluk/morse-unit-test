import { Assert } from '../libs/types/Assert';
import { doTest } from '../Morse';

const tests = {
    'passWithBoolean': (assert: Assert) => {
        assert(true);
    },

    'failedWithBoolean': (assert: Assert) => {
        assert(false);
    },

    'passWithAssertion': (assert: Assert) => {
        assert(1,1);
        assert('aaa', 'aaa');
    },

    'failedWithAssertion': (assert: Assert) => {
        assert(1,2);
        assert('aaa', 'bbb');
    },

    'errorWithThrow': (assert: Assert) => {
        throw new Error('Message hogehoge');
    },

    'unsafe': (assert: Assert) => {
        //
    },

    'breakLine': (assert: Assert) => {
        [...Array(25)].forEach(e =>
            assert(true)
        )
    },

    'async':  (assert: Assert): Promise<void> => {
        return new Promise((res) => {
            setTimeout(() => {
                assert(true);
                res(void 0);
            }, 1000)
        });
    },

    'errorPromise': (assert: Assert): Promise<void> => {
        return new Promise((res) => {
            setTimeout(() => {
                assert(false);
                res(void 0);
            }, 1000)
        });
    },

    'errorAsync': async (assert: Assert): Promise<void> => {
        setTimeout(() => {
            assert(false);
            return void 0
        }, 1000);
    },
};

doTest(tests);
