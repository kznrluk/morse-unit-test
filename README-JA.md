# Morse Unit Test Runner

<p align="center">
  <img src="https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/errors.png" alt="errors">
</p>

Morse(モールス)は、すぐに使えるシンプルで扱いやすいJavaScript用のユニットテストランナーです。

[English Document Available](./README.md)

## Why Morse?
* 特別なコマンド不要
* 複雑なドキュメントなし
* テストの並列実行で高速動作
* 見やすいテスト結果
* Async関数に対応
* 実行時依存ライブラリがゼロ
* JSの基本機能がベースなため、拡張が容易

## How to Use
Morseは必要最低限のテスト環境のみを提供します。

### #1 インストール
`npm`コマンドでインストールできます。

```
npm install --save-dev morse-unit-test
```

### #2 テストを書く
テストはどのようなディレクトリ、ファイルでも実行可能です。
テストはオブジェクト内に関数として定義します。

テストは通常の関数のほか、`async/await`を使用した非同期の関数も使うことができます。

```javascript
// import { doTest } from 'Morse';
const Morse = require('Morse');

const tests = {
    '失敗するテスト': (assert) => {
        assert(2, 1); // 失敗
        // assert(false) // 同じように失敗します
    },
    
    '成功するテスト': (assert) => {
        assert(2, 1+1); // 成功
        // assert(true) // 同じように成功します
    },

    '非同期関数のテスト': async () => {
        const result = await someAsyncFunction();
        assert(result !== undefined);
    }
}

Morse.doTest(tests);
```

**現状**、テストの順番は保証されません。特に、`async/await`を利用したテストを行う場合、順番が上下する可能性があります。

### #3 テストを実行する
`node`コマンドで直接実行します。

```
node yourTest.js
```

結果はコンソール内に表示されます。

![Example Output](https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/example_output.png)

### テスト結果の見方
![Console](https://raw.githubusercontent.com/kznrluk/morse-unit-test/docs/console.png)

アサーションの結果は以下の4種類です。
* `PASSED (.)` 問題なくテストが完了した。
* `FAILED (F)` テストの結果が予想される値と合わなかった。
* `ERROR  (E)` テストの動作中に例外が発生した。
* `UNSAFE (U)` 問題なくテストが終了したが、アサーションが実行されなかった。
