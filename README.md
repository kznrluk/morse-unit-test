# Morse Unit Test Runner

<p align="center">
  <img src="https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/errors.png" alt="errors">
</p>

<p align="center">
  Morse is a simple, easy, fast unit test runner for JavaScript / TypeScript.
</p>

[Japanese Document Available](./README-JA.md)

## Why Morse?
* No extra command
* No complex document
* High speed operation by parallel test execution
* Easy-to-read test results
* Async function support
* Zero runtime dependencies
* Easy to extend because it is based on the default functions of JS

## How to Use
Morse provides only a minimal test environment.

### #1 Install
You can install from `npm` command.

```
npm install --save-dev morse-unit-test
```

### #2 Write a test
Tests can be run on any directory or file.
Tests are defined as functions in objects.

Tests can use regular functions as well as asynchronous functions using `async / await`.

```javascript
// import { doTest } from 'Morse';
const Morse = require('Morse');

const tests = {
    'Test to be failed': (assert) => {
        assert(2, 1); // failed
        // assert(false) // Same as above
    },
    
    'Test to be passed': (assert) => {
        assert(2, 1+1); // passed
        // assert(true) // Same as above
    },

    'Test async function': async () => {
        const result = await someAsyncFunction();
        assert(result !== undefined);
    }
}

Morse.doTest(tests);
```

Currently, the order of testing is not guaranteed. In particular, when performing tests using `async / await`, the order may change.

### #3 Run the test
Execute directly with the `node` command.

```
node yourTest.js
```

The results are displayed in the console.

![Example Output](https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/example_output.png)

### How to check test results
![Console](https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/console.png)

There are 4 types of assertion results:
* `PASSED (.)` Test completed without any problems.
* `FAILED (F)` test result did not match expected value.
* `ERROR  (E)` An exception occurred during the test operation.
* `UNSAFE (U)` The test completed successfully, but no assertions were performed.
