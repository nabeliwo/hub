---
title: 'なぜ俺の Array#includes は string を受け取れないのか'
description: 'as const した配列の Array#includes に string を渡せない問題を入り口に、issue をたくさん読んで言語機能の意思決定について学んだ話。'
date: '2026-06-22'
category: 'tech'
tags: ['ts', 'js']
image: ''
alt: ''
---

今回は、TypeScript でコードを書く際に僕がいつも `Array#includes` に対して感じる疑問を深掘りしていこうと思います。

## 納得のいかない挙動

僕はよく以下のように `Array#includes` を使ったコードを書きます。

```ts
const validParams = ['hoge', 'fuga', 'piyo'] as const

const isValidParam = (param: string) => {
  return validParams.includes(param)
}

const str: string = 'dynamic parameter' // ここが動的な値だったりする

if (isValidParam(str)) {
  // ...
}
```

例えば、URL のクエリパラメータを扱う際などに書いたりします。  
特定のクエリパラメータに対して、許容する文字列のパターンをいくつかに絞っておいて、それ以外の値が渡された場合はそのクエリパラメータは invalid である、としたい場合などです。

ただ上記のコードの処理は残念ながら型チェックが通りません。  
`Argument of type 'string' is not assignable to parameter of type '"hoge" | "fuga" | "piyo"'.` という型エラーが発生します。

それは当然です。`validParams` は `string[]` ではなく `readonly ["hoge", "fuga", "piyo"]` という型なので、それに対して `string` を比較対象として渡すことはできません。`includes` に渡す `param` の値として許されるのは、`'hoge', 'fuga', 'piyo'` の3つだけです。

ただ個人的には、ここに若干の違和感を覚えます。  
だって渡されてきた `param` が `'hoge', 'fuga', 'piyo'` に含まれているとわかっているのであれば `includes` をする必要がそもそもなく、含まれているのかわからない `string` だからこそ `includes` で確認したいわけですから。

そうなると、`validParams` に対して `as const` して readOnly のリテラル型にするのをやめて、`string[]` 型として扱えるようにすれば良いのでは、という声が聞こえてきます。

```ts
const validParams = ['hoge', 'fuga', 'piyo'] // string[] 型になる

const isValidParam = (param: string) => {
  return validParams.includes(param) // 型エラーが起きない
}

const str: string = 'aaa'

if (isValidParam(str)) {
  // ...
}
```

それは完全にその通りで、そうすれば型チェックが通って万事解決なわけです。  
がしかし、この `validParams` から `(typeof validParams)[number]` のようにして、`"hoge" | "fuga" | "piyo"` 型を取りだして後続の処理で使いたいことは往々にしてあります。

```ts
const validParams = ['hoge', 'fuga', 'piyo'] as const
type ValidParam = (typeof validParams)[number] // "hoge" | "fuga" | "piyo" のユニオン型になる
```

型と値を個別に定義するのは冗長なので変数から型を作りたいという欲求があり、`as const` はあるとやっぱり嬉しいです。

## 解決策を考える

ここまで書いてきたうまくいかないポイントを解決する方法を考えてみます。  
そのためにまず `Array#includes` の型定義を確認しましょう。

```ts
interface ReadonlyArray<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}
```

参考: [TypeScript/src/lib/es2016.array.include.d.ts at main · microsoft/TypeScript](https://github.com/microsoft/TypeScript/blob/main/src/lib/es2016.array.include.d.ts#L10-L17)

`const validParams = ['hoge', 'fuga', 'piyo'] as const` を宣言した場合、型は `ReadonlyArray<"hoge" | "fuga" | "piyo">` になるため、`includes` の第一引数の `searchElement` の型は `"hoge" | "fuga" | "piyo"` になります。ということで、`string` が渡せない、ということがわかります。

これをオーバーロードしてみます。

```ts
declare global {
  interface ReadonlyArray<T> {
    // any の利用
    includes(searchElement: any, fromIndex?: number): searchElement is T
  }
}

const validParams = ['hoge', 'fuga', 'piyo'] as const

const isValidParam = (param: string) => {
  return validParams.includes(param)
}

const str: string = 'aaa'

if (isValidParam(str)) {
  console.log(str) // str: "hoge" | "fuga" | "piyo"
}

export {} // declare global が動くようにするために module 化している
```

`searchElement` の型を `any` に変えることで、`includes` の第一引数に対してどんな値でも入れられるようにしています。  
その結果、`as const` を使ったまま `isValidParam` 関数の中身の型チェックは通るようになりました。ついでに `includes` の戻り値を `searchElement is T` にして型ガードとして振る舞うようにすることで、`isValidParam(str)` をした後の `str` の型を `"hoge" | "fuga" | "piyo"` に絞ることができるようにしています。

これは非常に楽な解決策で、一見とても良さそうに見えます。  
ただ以下のようなコードを書いた場合はどうでしょうか？

```ts
declare global {
  interface ReadonlyArray<T> {
    includes(searchElement: any, fromIndex?: number): searchElement is T
  }
}

const validParams = ['hoge', 'fuga', 'piyo'] as const
const num: number = 1

if (validParams.includes(num)) {
  console.log(num) // num: never になる
}

export {}
```

上記のコードは型チェックが問題なく通ります。しかし、`validParams.includes` に `string` 型の値を渡せるようになることを期待していたわけですが、`number` 型や他の関係ない型まで渡せるようになるのは本意ではないはずです。また、`validParams.includes(num)` をした後のブロックで `num` は `never` 型になります。`number & ("hoge" | "fuga" | "piyo")` というのはあり得ないので、これも当然の挙動です。  
こう考えてみると、やはり `searchElement: any` は簡単ですが、型安全性を失っており、良い解決策ではないということがわかります。

## より良い解決策を考える(理想編)

では、オーバーロードを使ったまま、より良い解決ができるかを再び考えてみます。  
理想は以下のようなコードです。

```ts
declare global {
  interface ReadonlyArray<T> {
    includes<U super T>(searchElement: U, fromIndex?: number): searchElement is T
  }
}
```

U が T の上位型であれば、`searchElement` として受け取ることができる、というものです。  
例えば、`"hoge" | "fuga" | "piyo"` に対して `string` はより広い型であり、上位型です。同じように `400 | 401 | 404` 型に対して `number` はより広い型であり、上位型です。  
これが成り立つ場合、以下のような挙動を担保できるはずです。

```ts
const validParams = ['hoge', 'fuga', 'piyo'] as const

const str: string = 'aaa'
const num: number = 123

validParams.includes(str) // 型チェックが通る
validParams.includes(num) // 型チェックが通らない
```

つまり、`string` は比較対象として受け取りたいが、`number` のように明らかに比較対象にならない型は弾きたい、ということです。これはとても良い解決策に見える、というかこれしかないような感じがします。  
しかし、これは絵に描いた餅です。Java などの言語には `super` による下限境界(lower bound: その型か、それより広い上位型を許す制約)の表現がありますが、TypeScript にはそれに相当する構文がありません。

ということで、`Array#includes` の型をオーバーロードする夢は諦めて、現実的な解決策を考えてみます。

## より良い解決策を考える(現実編)

というわけで、そうなると別の関数を定義するしかないかなと思います。

```ts
const arrayIncludes = <T extends U, U>(values: readonly T[], value: U): value is T => {
  return values.includes(value as T)
}

const validParams = ['hoge', 'fuga', 'piyo'] as const

const isValidParam = (param: string) => {
  return arrayIncludes(validParams, param)
}

const str: string = 'aaa'

if (isValidParam(str)) {
  console.log(str) // str: "hoge" | "fuga" | "piyo"
}
```

先ほどの `super` を使った理想形に近いことを、関数の型パラメータの関係として表現しています。  
きっとこれが現状最もしっくりくる、配列に対する `includes` の形かなと思います。

ただ一つ気になるところとして、内部で `value as T` をしている点があります。  
これは任意の値を無理やり `T` として扱いたいわけではなく、標準の `Array#includes` が `searchElement: T` を要求するため、その型定義に合わせるための型アサーションです。  
`arrayIncludes` の型定義では `<T extends U, U>` によって、配列の要素型 T が `value` の型 U の下位型であることを保証しています。  
そのため、`number` のような明らかに比較対象にならない値は呼び出し側で弾くことができます。

完全に型アサーションを消せるわけではありませんが、危険な型アサーションを呼び出し側に散らばらせるのではなく、制約を持った小さな関数の内部に閉じ込められている、という点で現実的な落としどころかなと思います。

## なぜ Array#includes の型定義がそうなっているのか

これで良い感じの関数を用意できたので解決！ということではなく、この記事では TypeScript における `Array#includes` の型定義がどうしてこうなっているのかをもう少し調べてみます。  
ここまでが前段で、ここからが本題です。

実は今回の問題は何年も前から TypeScript の界隈では取り上げられているトピックです。  
[\`Array.includes\` type is too narrow · Issue #26255 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/26255)  
(この issue 以外にも似たような issue が大量に作成されており、その度に Duplicate ラベルがつけられ、クローズされています。)

コメント欄を追っていくと、僕と同じように `Array#includes` の型に違和感を覚えたユーザーから様々な意見が寄せられ、それに対して TypeScript の開発者の方がどういう意図を持って今の状態になっているかを丁寧に伝えているように見えます。

コメントでは「`searchElement` の型を要素型に制限するのは厳しすぎである」というような意見が多数寄せられています。  
`includes` は、引数がどの要素とも一致しなければ `false` を返す、という挙動が ECMAScript の仕様としてはっきり定義されています。どんな型の値を渡しても、副作用もなく、ただ `true` か `false` を返すだけです。であれば、引数の型を `"hoge" | "fuga" | "piyo"` のような要素型に絞ったところで、いったいどんな追加の型安全性が得られているのか分からない、という主張です。  
むしろこの制限のせいで、開発者は本来書きたかった素直なコードを書けず、キャストを挟むような、直感的でなく不自然で、かえってバグを生みやすいコードを書かされている、という指摘もあります。記事冒頭で僕が覚えた違和感も、概ねこれらの意見と一致しています。

それに対し、TypeScript の開発者はどうして今こうなっているのか、そしてどうあるべきかについての考え方を述べています。  
ECMAScript の仕様上はどんな値でも渡せる、ということは、それが正しいプログラムであることを意味しません。そもそも TypeScript は「JavaScript のコードの中には正しくないものがあり、それを静的に検知したい」という思想で作られたものです。  
`"hoge" | "fuga" | "piyo"` の配列に対して `number` を `includes` するようなコードは、多くの場合プログラマの間違いであり、それを型エラーとして弾けることこそが価値だ、という考え方です。

この issue は、いつまでも同じ話が堂々巡りしている、という理由で、最終的にクローズされ、コメントもロックされています。  
着地点として、ユーザーも開発者も、`Array#includes` の `searchElement` を `any` や `unknown` にして、まったく関係ない型を渡せるようにしたいわけではなく、上位型(supertype)は渡すことができても良いという点では意見が一致しています。  
しかし、以下2つの issue で挙げられている課題により、まだ実装には至っていないようです。

- [Enable type parameter lower-bound syntax · Issue #14520 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/14520)
- [Suggestion: one-sided or fine-grained type guards · Issue #15048 · microsoft/TypeScript](https://github.com/microsoft/TypeScript/issues/15048)

## 引数側の課題 - lower-bound syntax #14520

1つ目は [#14520](https://github.com/microsoft/TypeScript/issues/14520)、型パラメータの下限境界(lower-bound)構文の話です。これは記事の前半で「理想形」として書いた構文そのものです。

```ts
includes<U super T>(searchElement: U, fromIndex?: number): searchElement is T
```

`<U super T>`、つまり「U は T か、それより広い上位型」と書ければ、`searchElement` に `string` (`"hoge" | "fuga" | "piyo"` の上位型) は渡せるけれど、`number` のような無関係な型は弾ける、という挙動を表現できます。  
前半で「TypeScript には `super` に相当する構文がない」と書きましたが、それを言語機能として入れようというのが、まさにこの issue です。

ただこれは `Array#includes` のためだけの機能ではなく、ジェネリクス全体に関わる大きな言語機能です。`extends`(上限境界)はあるのに `super`(下限境界)はない、という非対称をどう埋めるかという話で、慎重に議論が続いており、まだ実装には至っていません。

そしてこの issue の中では「`<X extends Y, Y>` と書けば下限境界を擬似的に表現できる」という回避策が紹介されています。これは前半で書いた `arrayIncludes` 関数の `<T extends U, U>` と同じ表現です。  
僕はこの issue を見て真似をして `arrayIncludes` 関数を考えたわけではないのですが、結果的にこの `super` がない世界での現実解をそのままなぞっていたんだな、と気付いて少し嬉しくなりました。  
(そもそも `arrayIncludes` みたいな解決策は広く知られているので別に僕が生み出したわけではないという前提で)

## 戻り値側の課題 - 片側型ガード #15048

2つ目は [#15048](https://github.com/microsoft/TypeScript/issues/15048)、片側(one-sided)あるいは細粒度(fine-grained)な型ガードの話です。こちらは引数ではなく、戻り値、つまり絞り込みの側の課題です。

そもそも TypeScript の型ガード( `x is T` )は、true 側と false 側の両方で型を絞ります。

```ts
const isString = (x: unknown): x is string => typeof x === 'string'

declare const x: string | number

if (isString(x)) {
  console.log(x) // string
} else {
  console.log(x) // number ← false 側も絞られる
}
```

テストを通った値はすべて T、落ちた値はすべて T ではない、と解釈されます。  
ところが `includes` は、この「落ちた値はすべて T ではない」が成り立ちません。`includes` が見ているのは、その配列に実際に入っているかであって、型として T か、ではないからです。

```ts
// includes が `searchElement is T` を返す(両側型ガードになる)と仮定する
declare global {
  interface Array<T> {
    includes(searchElement: T, fromIndex?: number): searchElement is T
  }
}

const arr: ('a' | 'b' | 'c')[] = ['a', 'b'] // 型は3つだが、中身は2つ
declare const x: 'a' | 'b' | 'c'

if (arr.includes(x)) {
  console.log(x) // 'a' | 'b' | 'c'
} else {
  console.log(x) // never ← 両側ガードだと never に絞られてしまう
}

export {}
```

`'c'` は型としては正しいのに、配列に入っていないので `includes` は `false` を返します。それを「`x` は `never`」と絞るのは間違いです。  
なので `includes` に欲しいのは、true 側だけ絞り false 側は何も絞らない、という片側の型ガードです。これがあれば `includes` を安全に型ガードとして振る舞わせることができます。`Number.isInteger` のように、落ちても型は確定しない関数は他にもあり、[#15048](https://github.com/microsoft/TypeScript/issues/15048) はそれらをまとめて扱える構文を入れようという提案ですが、これもまだ議論の途中です。

## おわりに

最初は「`as const` で配列を定義した際の `Array#includes`、あまりにも不便すぎんか…」というところから解決策を考えたところが始まりで、そして「そもそもなんで TypeScript 側でこれを解決してくれへんのや…」という思いから issue を漁ってみたところ、思っていたよりもずっと難しい問題だったんだな、という気づきがありました。

`Array#includes` を TypeScript 側でより良い挙動にするためには、

- 引数側: supertype を受け取れるようにする下限境界構文
- 戻り値側: false 側を絞らない片側型ガード

という、まだ TypeScript に存在しない言語機能が必要だ、というところに行き着きました。  
`Array#includes` だけのためにその場しのぎを足すのではなく、汎用的な機能として正しく入れようとするから何年も議論が続いていると考えると、現状に対する納得感が出てきます。

そして前半で書いた `arrayIncludes` を改めて見ると、これは [#14520](https://github.com/microsoft/TypeScript/issues/14520) の回避策( `<T extends U, U>` )をそのまま使ったものでした。`as const` を前提にする限り「配列の中身 = 要素型」なので、戻り値の型ガードもちゃんと機能します。標準の `Array#includes` がここまで踏み込めないのは、`as const` ではない一般の配列まで安全に面倒を見ようとすると、[#15048](https://github.com/microsoft/TypeScript/issues/15048) の片側ガードが要るからなのでしょう。

実際まだこれらが実装されていないのが本当に話が大きいからなのか、優先度が低いだけなのか、そのあたりのところまでは踏み込んで調べ切れてはいないのですが、個人的にはいつか `super` と片側ガードが入って、`arrayIncludes` 関数が要らなくなる日が来ると嬉しいな、と思いました！  
おわり。
