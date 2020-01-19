# Morse Test Runner

Morse(モールス)は、シンプルで高い拡張性を持つテストランナーです。

## How to Use
Morseは必要最低限のテスト環境のみを提供します。

基本的な使い方は以下の三つです。

### #1 テストを書く

テストはオブジェクト内に関数として定義します。

```javascript
const tests = {
    'testTestFailed': (assert) => {
        assert(2, 1); // failed
    },
    
    'testTestPassed': (assert) => {
        assert(2, 1+1); // passed
    }
}
```

### #2 テストを実行する

Morseを読み込み、`doTest()`関数を実行してください。

```javascript
import { doTest } from 'Morse';
const test = { ... }; // #1で作成したオブジェクト
doTest(test);
```

### #3 結果を見る
結果はコンソール内に表示されます。

```
Thank you for use Morse Test Runner.

+--------------- Results ---------------+
. F
+---------------------------------------+

Failed * testTestFailed
    Failed asserting that 1 is 2;

Done.
```


### Where to use

Morseは、小さなプロジェクトに導入する最初のテストランナーとしておすすめです。




