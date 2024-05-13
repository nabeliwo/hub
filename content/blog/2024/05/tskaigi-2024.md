---
title: 'TSKaigi 2024 に参加しました'
description: 'TypeScript のカンファレンスである TSKaigi 2024 に参加したので、登壇した感想と見たセッションのまとめをやります。'
date: '2024-05-13'
category: 'tech'
tags: ['ts']
image: ''
alt: ''
---

TypeScript の技術カンファレンスである [TSKaigi 2024](https://tskaigi.org/) に参加しました。

日本での TypeScript のカンファレンスは TSConf JP というものがありましたが、コロナによって TSConf JP 2020が開催中止になって移行イベントは行われず、去年 TypeScript JP 自体が解散する形になり、日本での TypeScript の大きな規模のイベントはしばらくないものと思っていました。

そんな中で TSKaigi というイベントを立ち上げてくれた運営の皆様にはめちゃくちゃ感謝しています。  
総参加者数は2,400人もいたらしく、とても大規模にも関わらず1日通してずっと楽しかった素晴らしいイベントでした。

この記事はそんな TSkaigi 2024 に参加した自分が見たセッションのまとめと、5分 LT 枠で登壇させていただいた感想を書きます。

## 僕が見たセッションまとめ

全てのセッションのスライドは [yoiwamoto](https://twitter.com/yoiwamoto) san がまとめてくれていたので気になる方はそちらを参照してください。  
[TSKaigi 2024 スライドまとめ【非公式】](https://zenn.dev/you_5805/scraps/e379f531c50379)

### Keynote: What's New in TypeScript

Microsoft 社で TypeScript の Principal Product Manager をされている [Daniel Rosenwasser](https://twitter.com/drosenwasser) san の Keynote です。

TypeScript の使用率がどのような変遷を辿ったのかという話や TypeScript がどこで使われているのかなどの話から、TypeScript のバージョン5.4や5.5などで入る新しい機能についての話をライブコーディング形式で説明されていました。

この話を聞きながら僕が強く感じていたのは「英語、強くなりたい…」でした。  
僕の知っている技術の話だしスライドでコードが出ているのである程度理解はできるのですが、やっぱり詳しい話はわからないし周りの人たちが笑っていた場面でなぜ笑っているのかがわからないみたいなこともありました。

TypeScript の機能の話自体は、以下のリンクで解説されている内容でもあるので、気になる方は読んでみてください。

- [Announcing TypeScript 5.4 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/)
- [Announcing TypeScript 5.5 Beta - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-beta/)

個人的には、5.5から型述語を推論してくれるようになって filter での null や undefined の除外が型推論でできるようになったのがめっちゃ便利で嬉しい話でした。

### Prisma ORMを2年運用して培ったノウハウを共有する

Cloudbase 株式会社の [tockn](https://twitter.com/tockn_s) san の発表です。

[Prisma ORMを2年運用して培ったノウハウを共有する - Speaker Deck](https://speakerdeck.com/tockn/prisma-ormwo2nian-yun-yong-sitepei-tutanouhauwogong-you-suru)

僕は Prisma を業務で使用したことがなく、個人の趣味の範囲での活用レベルの経験しかなかったので、業務で使うとなった場合に出てくるような現実的な問題にどのように対応していくのかというところがとても気になっていたので、セッションに参加しました。

内容としては、パフォーマンス・スケーラビリティ、セキュリティ、テスタビリティ、オブザーバビリティという側面から、直面してきた問題をどう解決したかという話をされていました。

僕は Prisma が発行する SQL がどうなっているのかというのを知らなかったので、意外とパフォーマンス問題のある SQL を発行してしまうことや、そしてその問題への対策もセットで知ることができたのは良かったです。  
また、マルチテナントのアプリケーションでテナントを超えたデータの漏洩が行われないようにどのように対策をしているかという話で、PostgreSQL の Row Level Security を使用しているということで、それは弊社と全く同じでふむふむしてたのですが、それを Prisma で活用する為に独自クラスを作った話はとても参考になりました。

また、多くの問題を独自クラスを作ることで解決されていたのですが、発表の終盤では自作したものを OSS 化したので使ってみてくださいという話があり、会場で拍手が沸き起こりました。  
やっぱりこういう貢献の姿勢と、それが評価される環境って素晴らしいですね。

### TypeScript 関数型スタイルでバックエンド開発のリアル

株式会社一休の CTO である [naoya_ito](https://twitter.com/naoya_ito) san の発表です。  
僕はエンジニア人生を naoya san のコンテンツを見て過ごしてきたので、正直なところまず naoya san の発表を生で見れる興奮が先にあったのですが、その内容自体も僕の経験のない世界をわかりやすく説明されていて勉強になりました。

[TypeScript 関数型スタイルでバックエンド開発のリアル - Speaker Deck](https://speakerdeck.com/naoya/typescript-guan-shu-xing-sutairudebatukuendokai-fa-noriaru)

以前から一休でやっている関数型スタイルでのバックエンド開発のスライドは投稿されていたのでわりと読んではいて、そこで感じた疑問が解決されるような内容でした。

実際 TypeScript のバックエンドを関数型のスタイルで開発する場合、ドメインレイヤー以外はそれほど変わらないらしく、ドメインレイヤーも整理の仕方はオブジェクト指向のときと考え方は同じということで、それが何を意味するかを実際のコードを見ながら説明されていました。

発表の中で出てきた Result 型というのは、自分の開発でもエラーハンドリングを適切にするために一部取り入れているところがあって便利だなと感じていたのですが、それを [neverthrow](https://github.com/supermacro/neverthrow) というライブラリを使うことで徹底して関数型のスタイルでメソッドチェインの形で書くことで、一つのユースケースを表現できるわかりやすさがよく伝わりました。

そして TypeScript で Result 型を使う上で不便なところもあって、それが Result 型を組み込みで持っている言語では解決されている話は、Ruby と JS の世界しか知らない自分には新鮮で、他の言語を学ぶことへの興味が湧いてきました。

### TypeScriptから始める VR生活

株式会社ウィルゲートの [TamaG](https://twitter.com/TAMAGOKAKE_G_) san の LT です。

[TypeScriptから始める VR生活 - Speaker Deck](https://speakerdeck.com/tamagokakeg/typescriptkarashi-meru-vrsheng-huo)

僕は趣味の一つに VR ゲームがあって、Steam VR で発売されている VR ゲームをたまにやっているので、TS で VR と聞いたらとりあえず話を聞いてみたい！と思って参加しました。

内容としては、[Resonite](https://store.steampowered.com/app/2519830/Resonite/?l=japanese) という VRChat に似たソーシャルコミュニケーションプラットフォームの紹介で、特徴としては Resonite 内でモデリングをしたり、ビジュアルプログラミングでプログラムを組むことで、ゲーム内だけで完結してワールドやコンテンツを作ることができるというめっちゃクリエイティブなプラットフォームでした。

ただそのゲーム内のツールではバージョン管理や関数化ができないので、スパゲッティ化待ったなしという状態らしく、それを解決するために [MirageX](https://github.com/rheniumNV/mirage-x-template) というツールがあり、それを使うと TypeScript x React で Resonite の開発が行えるということでした。

React コンポーネントで描画できるものがなんなのかのイメージが全然湧かなかったのですが、とりあえず楽しそうというのは伝わったので僕も Resonite インストールしよう思います。

### Powerfully Typed TypeScript

株式会社ドワンゴの [ユーン](https://twitter.com/euxn23) san の LT です。

[Powerfully Typed TypeScript - Speaker Deck](https://speakerdeck.com/euxn23/powerfully-typed-typescript)

TypeScript での開発を便利にするライブラリの紹介でした。  
使ったことのないライブラリも結構ありました。特に[ts-pattern](https://github.com/gvergnaud/ts-pattern) に関しては、TS でパターンマッチしたいな〜って思ったことが何回かあるので、あるんだ！ってなったので次の趣味開発で使ってみます。

内容とは直接関係ないですが、スライドに自分を映した画面を出したり、発表しながら自分で録画をしていたりなど、登壇慣れしている感じがすごかったです。

### TanStack Routerで型安全かつ効率的なルーティングを実現

株式会社 CyberAgent の [ytaisei](https://twitter.com/ytaisei_) san の LT です。

[TanStack Routerで型安全かつ効率的なルーティングを実現 - Speaker Deck](https://speakerdeck.com/ytaisei/tanstack-routerdexing-an-quan-katuxiao-lu-de-naruteinguwoshi-xian)

アプリケーションのフロントエンドを作るとき、Next.js や Remix のようなフレームワークを使うのか、それともフレームワークは使わずに Vite + React で作るのか。  
フレームワークを使う場合はルーティングを React Router でやるのか、それとも React Router 以外のルーティングライブラリを使うのか。  
このあたりのことは毎回悩む部分で、僕も最近はわりともうすぐ Next.js で作り始めちゃうのですが、実際には Next.js を使うほどではないものであることも多いので、よりシンプルに作れるやり方は知りたかったです。

そこで、TanStack Router を使ったルーティングだと何が良いのか、というところを話されていて、個人的には Search Params を型安全に扱えるところがめっちゃ良いなあ〜となりました。  
たまたま今業務で作っているアプリケーションは Next.js を使わずにやっているので、TanStack Router 使ってみても良さそうとなりました。

### tRPCを実務に導入して分かった旨味と苦味

株式会社ゼストの [みそとん](https://twitter.com/misoton665) san の発表です。

[tRPCを実務に導入して分かった旨味と苦味 - Speaker Deck](https://speakerdeck.com/misoton665/trpcwoshi-wu-nidao-ru-sitefen-katutazhi-wei-toku-wei)

実務で tRPC を導入した結果どうだったか、という話を GraphQL と比較しつつ、tRPC の旨味・苦味という観点で話されていました。  
tRPC は知識としては知っていたものの触ったことはまったくなかったので、入門させてもらう気持ちでセッションを聞いていたのですが、tRPC でできることと tRPC を使うことで発生しがちな課題をなんとなく把握できました。

Data Transformer を使うことで serialize できない値をバックエンドとフロントエンドを通して使うことができるっていうのは個人的にはめっちゃほしいなと思っていたものだったので、その点はすごく魅力的に感じました。

また、話の中で出てきたサーバーとフロントを共通化することで横断できる組織にしたいということを言いつつも、実際には Model はサーバーとフロントで共通化するかどうかというところは No と答えていて、サーバー目線で定義したい Model とフロント目線で定義したい Model は一致しないという話にはとても共感できました。

### TypeScriptとGraphQLで実現する 型安全なAPI実装

ユビー株式会社 の [hokaccha](https://twitter.com/hokaccha) san の発表です。

[TypeScriptとGraphQLで実現する 型安全なAPI実装 / TSKaigi 2024 - Speaker Deck](https://speakerdeck.com/hokaccha/tskaigi-2024)

API に型をつけたいという欲求はみんなめっちゃあって、弊社では OpenAPI でそれを解決していますが、やっぱり GraphQL はもうだいぶ前から人気があって僕も趣味開発では触ったりするので、学びがありそう〜と思いセッションを見ました。

実際に TypeScript 環境で GraphQL を使う上での罠と、その対策をわかりやすく解説されていて、全く知らない機能の話もあったのですが問題なくついていくことができました。Fragment Colocation 便利。

### Prettierの未来を考える

ユビー株式会社の [sosuke](https://twitter.com/__sosukeSuzuki) san の発表です。

[TSKaigi 2024 Prettierの未来を考える スピーカーノート](https://zenn.dev/sosukesuzuki/articles/756e04848885bd)

Prettier のメンテナーである sosuke san が Prettier を Deno のフォーマッターや Biome と比較しつつ、Prettier が今後注力するべきポイントについて話されていました。  
Prettier はこれまで競合がいなかったことで、パフォーマンスについて意識してこなかったということで、今後はパフォーマンス改善にも注力していくということで、Prettier の未来がとても楽しみになる話でした。

発表のスライドをほぼ作っていないということで、ほぼ口頭での説明だけで発表が進んだのですが、それでも全然わかりやすく話に引き込まれたので、この発表のうまさは見習いたいなと感じました。

## 登壇した感想

僕は5分の LT 枠で発表させてもらいました。  
過去に会社のテックブログで話した内容を LT 用にまとめたものではありますが、現場のたまにあるユースケースとして参考になることもあるんじゃないかなと思います。

[多言語化対応における TypeScript の型定義を通して開発のしやすさについて考えた / TSKaigi TypeScript Multilingualization - Speaker Deck](https://speakerdeck.com/nabeliwo/tskaigi-typescript-multilingualization)

CfP 出したときは「通ったら儲けもん」くらいの気持ちだったのですが、実際通って当日が迫ってくると日々どうしよどうしよ…ってなっちゃってなかなかメンタルに来てました。  
小規模な勉強会や一社単独だったり二社共同のイベントのような規模感であれば何度か登壇はしていたのですが、カンファレンスのような規模の大きい場所での登壇は初めてだったので不安が大きかったです。

ただその分わりと早い段階で準備を終わらせて発表の練習時間をしっかり確保できたので、当日は意外と緊張しないで発表ができたように思います。  
ただ運が良いのか悪いのか発表順が一番最後だったので、自分の発表のことで頭がいっぱいで他の人の発表を聞いていられない自分としっかり聞いて何かしらを得なければという自分が戦って精神的に忙しい一日になりました。

CfP が通ったということ自体が自信に繋がっていたので準備段階では発表内容に不安はなかったのですが、終わってこうして振り返ってみると、発表者のみなさんの高品質な知見の共有と比べて自分の発表はどうだったかと考えて結構気持ちが落ち込んでしまったりしたのですが、次はもっと良い知見を共有できるよう日々の業務により集中していくぞという気持ちが強くなりました。

発表を5分に収めるというが地味に大変で、次の機会があれば少なくとも10分は時間を取れる枠に申し込みたいですね。

## まとめ

今回のイベントの傾向として、以下のようなものが多く見られた気がします。

- バックエンドとフロントエンドを同じ言語で一気通貫で開発するための技術や工夫の話
- 関数型のエッセンスを TypeScript に持ち込む話

同じように日々 TypeScript を触っている自分ですが、業務ではどちらも全然やっていなかったのでめっちゃ勉強になった1日でした。

イベント自体の楽しさもさることながら、イベント前夜のスピーカーディナーやイベント後の懇親会で、僕がエンジニア始めたての頃にたくさん記事を読んでお世話になった憧れのエンジニアの方々と技術のお話ができたこともめちゃくちゃ嬉しかったです。

最後に、僕の発表を聞いてくれた方がいましたらありがとうございました。  
TSKaigi 2024、素晴らしいカンファレンスでした。運営のみなさま、めちゃくちゃ大変だったと思いますがありがとうございました。  
TSKaigi 2025 も絶対参加します！

おわり。
