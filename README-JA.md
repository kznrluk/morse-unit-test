# Morse Unit Test Runner

Morse(モールス)は、すぐに使えるシンプルで扱いやすいJavaScript用のユニットテストランナーです。

以下のような特徴を持っています。
* ゼロコンフィギュレーション, ノーコマンドですぐに使えるシンプルな仕様
* テストの並列実行で高速動作
* 実行時依存ライブラリがゼロ
* JSの基本機能がベースなため、拡張が容易

## How to Use
Morseは必要最低限のテスト環境のみを提供します。

### #1 テストを書く
テストはどのようなディレクトリ、ファイルでも実行可能です。
テストはオブジェクト内に関数として定義します。

テストは通常の関数のほか、`async/await`を使用した非同期の関数も使うことができます。

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

**現状**、テストの順番は保証されません。特に、`async/await`を利用したテストを行う場合、順番が上下する可能性があります。

### #2 テストを実行する
`node`コマンドで直接実行します。

```
node yourTest.js
```

### #3 結果を見る
結果はコンソール内に表示されます。

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

アサーションの結果は以下の4種類です。
* `PASSED (.)` 問題なくテストが完了した。
* `FAILED (F)` テストの結果が予想される値と合わなかった。
* `ERROR  (E)` テストの動作中に例外が発生した。
* `UNSAFE (U)` 問題なくテストが終了したが、アサーションが実行されなかった。
