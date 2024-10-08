---
title: 'フロントエンドカンファレンス北海道2024に参加しました'
description: 'フロントエンドカンファレンス北海道2024というウェブフロントエンド領域の技術カンファレンスに参加したので、イベントの感想と北海道での思い出をまとめます。'
date: '2024-08-26'
category: 'tech'
tags: []
image: '/images/blog/2024/08/frontend-conference-hokkaido-2024/thumbnail.jpg'
alt: 'フロントエンドカンファレンス北海道2024の会場入り口。自動ドアに LED でカンファレンスのロゴが表示されていてとてもきれい。'
---

2024年8月24日に開催されたウェブフロントエンド領域の技術カンファレンスである[フロントエンドカンファレンス北海道2024](https://www.frontend-conf.jp)に参加したので、記憶に残っているセッションの感想をまとめます。

## セッション感想

全てのセッションの資料をまとめてくれた方がいるので、気になる方はそちらをご覧ください。  
[フロントエンドカンファレンス北海道 2024 公開資料・Xアカウントリンクまとめ](https://zenn.dev/yumemi_inc/articles/2024-08-25-frontend-conf-hokkaido-2024)

### ダークテーマとアクセシビリティの融合したカラートークンの設計

[degudegu2510](https://x.com/degudegu2510) san の発表です。  
[ダークテーマとアクセシビリティの融合したカラートークンの設計 - Speaker Deck](https://speakerdeck.com/degudegu2510/dakutematoakusesibiriteinorong-he-sitakaratokunnoshe-ji)

Qiita のダークテーマ対応でいかにアクセシビリティを担保するのか、という話でした。  
ライトテーマ・ダークテーマどちらの場合でも適切なコントラスト比を保つためのカラートークンの設計に関して、そもそもブランドカラーがコントラスト比という面で見ると適切じゃなかったという話、弊社でもあってデザイナー陣がめっちゃ頑張ってくれていた記憶があり、あ～～～やっぱあるあるなんだなあという気持ちになった。

じゃあそこからどうやってカラートークンを決めていくのか、またカラートークンの設計をどのように行うのか、という話が論理的に展開されていた納得感があって良かった。  
デザイナー、感覚的な人が多いという偏見を持ちがちなんだけど、この方や弊社のデザイナー陣を見てもめちゃくちゃ論理的に意思決定を行っていてとても良い。

### ブラウザ互換の重要性 - あらゆるユーザーに価値を届けるために必要なこと

[okuto_oyama](https://x.com/okuto_oyama) san の発表です。  
[ブラウザ互換の重要性 - あらゆるユーザーに価値を届けるために必要なこと](https://yamanoku.net/frontendo-2024/ja/)

我々が普段使っているウェブブラウザがどのように始まって、どのような変遷を経て今に至るのかという歴史の話から始まり、現在の Chromium 一強の時代が続くと何が問題なのか、というところまでとてもわかりやすくまとめられていました。

そしてその上でフロントエンド開発者がどのようなことを意識していくべきかという話も納得感があり、情報収集やっていかないとな、という気持ちになれました。

今回のイベント、タイムテーブルが2並列で進められていて、この発表の裏の発表もとても気になっていてどちらに参加するのか迷っていたのですが、この発表を見てやる気が湧いてきたので見て良かったです。  
最後に出てきた [Ladybird](https://ladybird.org/) という新しいブラウザプロジェクト、めちゃくちゃ楽しみですね。

### Webサイトをキュッと引き締めるモーションデザイン

[doke](https://x.com/doke) san の発表です。  
[FrontendConferenceHokkaido2024 - Slides](https://www.figma.com/proto/vcXBfew0hyKCFvmzaYGkIa/Slides?page-id=137%3A2&node-id=137-252&viewport=1437%2C517%2C0.48&t=HP4BLFHK4ty0fBFl-1&scaling=contain&content-scaling=fixed)

ウェブサイトにおけるモーションの役割とは何なのか、どういうことに気を付けないとそれが不利に働くのか、ぐっとくるモーションを作るための構成要素、というところをお話されていました。  
前半部分はうんうんわかるとうなずきながら聞いていましたが、後半の実践部分では具体的にこのミリ秒でモーションするとユーザーはこう感じるというところや、イージングをこうすればやぼったくならないみたいな勘所を数値で伝えていて、めっちゃためになる話でした。

弊社でも、figma を見て実装していく中で動きがあるところは雰囲気で実装してデザイナーに見てもらうということをやっていたので、今度これを参照して試してみたいなとなった。

### デザインシステムとコンポーネント指向によるフロントエンド開発プロセスの革新

[nrslib](https://x.com/nrslib) san の発表です。  
[デザインシステムとコンポーネント指向によるフロントエンド開発プロセスの革新 / Innovation in Frontend Development Processes through Design Systems and Component-Oriented Architecture - Speaker Deck](https://speakerdeck.com/nrslib/innovation-in-frontend-development-processes-through-design-systems-and-component-oriented-architecture)

レガシーなフロントエンド開発の経験しかないチームにデザインシステムとコンポーネント志向を導入して、どのように開発プロセスを良くしていったのか、という話をされていました。

Atomic Design の話が出てきたときは(自分はあまり綺麗にいった思い出がなかったので)、おや？となりましたが、どうやってコンポーネントを分けるのか、という共通認識を作るための活動を精力的にやってメンバーに浸透させており、またデザイナーとも Atomic Design を使って意思疎通を行うことでチーム内で足並みを揃えてやっており、中途半端な導入ではなくしっかりとやりきっているのがとても印象が良かったです。

あとはコミュニケーションの話やレビュワー育成の話など、技術の部分とは別でチーム組成において大切なことも絡めて話をされていて、本当に実践してきた感が感じられる良い発表でした。

### Web技術を駆使してユーザーの画面を「録画」する

[yukukotani](https://x.com/yukukotani) san の発表です。  
[技術を駆使してユーザーの画面を「録画」する - Speaker Deck](https://speakerdeck.com/yukukotani/recording-web-app-user-screen-powered-by-web-tech)

Sentry などのエラーレポートツールによくある画面録画の機能に関して、toC のようなアクセス数が莫大なプロダクトが使うと料金がめちゃくちゃ高くなるので自作したという話でした。  
自作と聞いたときに全然実装がイメージできなかったんだけど、仕組みを一つ一つ解説されていて、それを聞くとめちゃくちゃ泥臭いことをやっていてそれをやりきるのがすごすぎて感動しました。

聞いたあとは理屈が理解できるんだけど、その発想と多様なパターンに対応しきる実装力がすごい。

最終的にはそれらをやってくれている OSS があったというオチも付きつつ、その OSS では対応できていない部分も対応したものを OSS として出すという宣言もあり、一つの発表の構成としてもさすがという感じでした。

### Component-Driven Design & Development

[sakito](https://x.com/__sakito__) san の発表です。  
[Component-Driven Design & Development - Speaker Deck](https://speakerdeck.com/sakito/component-driven-design-and-development)

Design Token, Figma, Storybook を活用してデザインからフロントエンド開発をよりシームレスに繋ごうという内容の発表でした。

コンポーネントを構成する際に、Design Token から生成された CSS Variables、UI を持たない Headless Component、振る舞いの Hooks、この3要素を組み合わせてコンポーネントを作るっていうのはとてもきれいでやっていきたいですね。

Figma の話は、Code Connect という機能を使って hoge.figma.tsx というファイルを作ってコードと Figma を連携させるという話があって、これはめっちゃわくわくしました。  
実際にこれで UI の開発ができたら今あるデザインと実装の間のいろんな問題が解決するので楽しみ。

Storybook, Chromatic は弊社でもがっつり活用しているけど、本当にこれを使う以前どうやってたかもうわからんくらい便利になっているので本当に素晴らしいツールです。

### New Order in Cascade Sorting Order

[mugi_uno](https://x.com/mugi_uno) san の発表です。  
[New Order in Cascade Sorting Order - Speaker Deck](https://speakerdeck.com/mugi_uno/new-order-in-cascade-sorting-order)

CSS の優先度についての話でした。  
詳細度で優先順が違ってとか、!important は気をつけようねだとか、フロントエンドの開発をしているとこの辺りは当たり前に考えることですが、さらに詳しく色んなパターンで優先度がどうなるかを解説されていました。

layer や scope を使ったときの優先度などは全く知らなかったし、その際に !important を使うと優先度が逆転するのとかは、理屈を聞くとなるほどなとなったのですが全く知らなかったので勉強になりました。

### ECMAScript仕様を読むのに必要な知識 - ダイジェスト版

[syumai](https://x.com/__syumai) san の発表です。  
[ECMAScript仕様を読むのに必要な知識 - ダイジェスト版 - Speaker Deck](https://speakerdeck.com/syumai/ecmascriptshi-yang-wodu-munonibi-yao-nazhi-shi-daiziesutoban)

ECMAScript の仕様書、何度か見に行ったことがあってまじで何が書いてあるのか全然わからなかったんだけど、どのような表記法で書かれているのかというルールを説明されていて、その話はとてもわかりやすくて良かった。  
LT の中では一部しか触れられていなかったのですが、それだけでもわりと読めそうな感じはあったので次読みに行くときはもう一度参考にさせてもらいます。

### スクリーンリーダーを使ったアクセシビリティ検証のすすめ

[himi_himi_](https://x.com/himi_himi_) san の発表です。  
[スクリーンリーダーを使ったアクセシビリティ検証のすすめ - Speaker Deck](https://speakerdeck.com/himi/recommendation-screen-reader-test)

同僚の himi san です！社内でもアクセシビリティ改善がっつり進められているのを観測していてその成果の一旦が見れる！と楽しみにしていたやつです。

スクリーンリーダーを使った検証、なかなか開発プロセスの中で仕組化してやるっていうのがむずいなと思ってたんだけど、スクリーンリーダーを使うことで解決できる課題が具体的に説明されていて必要性がわかりやすく伝わって良かった。

最後には macOS の VoiceOver の使い方の記事を紹介されていて、そっちもわかりやすくて良かった。  
[macOSのVoiceOverを用いたチェックの実施方法 — freeeアクセシビリティー・ガイドライン Ver. 202408.0-RELEASE+5.0.2](https://a11y-guidelines.freee.co.jp/explanations/screen-reader-check-macos-voiceover.html)

### 腐敗防止層によるスムーズなライブラリ移行

[yoshiko_pg](https://x.com/yoshiko_pg) san の発表です。  
(発表資料見つけられず)

データ取得ライブラリを [SWR](https://swr.vercel.app/ja) から [TanStack Query](https://tanstack.com/query/latest) に移行する際、もともとライブラリの API を直接使わずに腐敗防止層を経由して使うようにしていたことで、移行に際して最小の労力でいけたという話をされていました。

これは個人的にもめちゃくちゃ大事だと思っていてよくやっているので共感がすごかったです。

## 懇親会

懇親会ではお寿司や唐揚げや焼き鳥など定番なものもありつつ、北海道で有名なデザートっぽいものが置かれていてそれがめっちゃうまかったし懇親会で甘いもの食べられるのあんまりないので嬉しいポイントでした。

またいつものように社内の人と盛り上がるというコミュ障ムーブをしてしまい、懇親会中にめっちゃたくさんの人と話すということはできなかったのですが、以前から顔見知りくらいだった方とがっつり話すことができたり、懇親会以外の時間ですが、普段から X などでよく観測している方とお話できたのも楽しかった。

## スポンサーブース感想

スポンサーブーススタンプラリーで景品をもらえる企画があったので、全てのブースをまわったのですがどの会社もいろんなコンテンツがあって話を聞いていて楽しかったです。

特にサイボウズのブースではフロントエンドクイズというのがあって、めちゃくちゃ難しい JavaScript や TypeScript の挙動に関してのクイズがあったのですが、僕は普通に間違えてダメージを負いました…。  
他の方の受けたクイズも聞いたのですが全部難しくて、サイボウズに入る人ってこれ全部わかるの…スーパーエンジニアじゃん…ってなりました。

あとサイバーエージェントはやっぱりグッズの質が高い。WINTICKET の帽子めっちゃ良かったです。

## 北海道の思い出

イベントの前日に飛行機で北海道に到着して、そこから北海道在住の同僚に案内してもらってジンギスカンと味噌ラーメンとパフェを食べました。  
(ジンギスカンの写真撮り忘れた)

![「すみれ」というラーメン屋の味噌ラーメンの写真。](/images/blog/2024/08/frontend-conference-hokkaido-2024/01.jpg 'すみれの味噌ラーメン。めっちゃ並んだけど最高でした')

![「佐藤」というお店のパフェ。イチゴがふんだんに使われている。](/images/blog/2024/08/frontend-conference-hokkaido-2024/02.jpg '佐藤というお店のパフェ。店内のおしゃれ感がすごかった。パフェはめっちゃうまかった')

2日目のお昼の時間は二条市場に行って海鮮丼を食べました。北海道のウニは本当に東京で食べるウニとは別物に感じる。

![二条市場という市場の写真。海鮮のお店がたくさん並んでいる。](/images/blog/2024/08/frontend-conference-hokkaido-2024/03.jpg '二条市場良い感じの雰囲気でした')

![「丼兵衛」というお店の三色丼。赤身とウニといくらが丼に並んでいる。](/images/blog/2024/08/frontend-conference-hokkaido-2024/04.jpg '丼兵衛というお店の三色丼')

滞在時間、自由時間が短かったので北海道の思い出が食べ物しかないのですが、あとは普通にずっとめっちゃ涼しくて快適で移住したくなりました。

## まとめ

言語に絞ったイベントではなくフロントエンドという枠なので、多様なジャンルの発表があって楽しかったです。  
JS,TS の話はもちろん、デザインやアクセシビリティの話が多かったことが印象的でした。  
運営の皆様もとても丁寧にイベントを作っているのがよく伝わってきたし、制作物のクオリティの高さへの感動もありました。

今回は僕は登壇ではなかったので1日ずっと話を聞いているだけだったのですが、ああやっぱりカンファレンスって良いなっていうのとめちゃくちゃモチベーションが上がったのでやっぱり参加して良かったです。  
あと北海道最高。おわり。
