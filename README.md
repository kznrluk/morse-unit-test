# Morse Unit Test Runner

Morse is a simple, easy-to-use unit test runner for JavaScript / TypeScript.

Morse has the following features.
* No special command, No complex document. Simple to use.
* High speed operation by parallel test execution
* Zero runtime dependencies
* Easy to extend because it is based on the default functions of JS

# How to Use
Morse provides only a minimal test environment.

### #1 Write a test
Tests can be run on any directory or file.
Tests are defined as functions in objects.

Tests can use regular functions as well as asynchronous functions using `async / await`.

```javascript
// import { doTest } from 'Morse';
const Morse = require('Morse');

const tests = {
    'testTestFailed': (assert) => {
        assert(2, 1); // failed
    },
    
    'testTestPassed': (assert) => {
        assert(2, 1+1); // passed
    },

    'testAsync': async () => {
        const result = await someAsyncFunction();
        assert(result !== undefined);
    }
}

Morse.doTest(tests);
```

Currently, the order of testing is not guaranteed. In particular, when performing tests using `async / await`, the order may change.

### #2 Run the test
Execute directly with the `node` command.

```
node yourTest.js
```

### #3 See the results
The results are displayed in the console.

```
            Morse Test Runner v0.0.1
-- --- .-. ... .  - . ... -  .-. ..- -. -. . .-.

+--------------- Results ---------------+
F . .
+---------------------------------------+

There were 1 failures:

 FAILED  - testTestFailed
           Failed asserting that 2 is expected 1.

Tests: 3, Assertions: 3, Failures: 1.
```

There are four types of assertion results:
* `PASSED (.)` Test completed without any problems.
* `FAILED (F)` test result did not match expected value.
* `ERROR  (E)` An exception occurred during the test operation.
* `UNSAFE (U)` The test completed successfully, but no assertions were performed.
