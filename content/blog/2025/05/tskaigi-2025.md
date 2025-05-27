---
title: 'TSKaigi 2025 に参加しました'
description: 'TypeScript のカンファレンスである TSKaigi 2025 に参加したので、登壇した感想と見たセッションのまとめをやります。'
date: '2025-05-27'
category: 'tech'
tags: ['ts']
image: ''
alt: ''
---

TypeScript の技術カンファレンスである [TSKaigi 2025](https://2025.tskaigi.org) に参加しました。  
[昨年も参加したので](/blog/2024/05/tskaigi-2024)2度目の参加だったわけですが、日程が2日間開催になっていて規模が拡大していました。すごい。

「TypeScript を冠した技術カンファレンスとしてはオフライン参加者が世界最大である」ということをオープニングでおっしゃられており、初日の朝から気持ちが上がりました。運営の皆様に感謝🙏

## 見たセッションまとめ

自分用メモとして見たセッションと一言感想をまとめます。

### The New Powerful ESLint Config with Type Safety

スライド: [The New Powerful ESLint Config with Type Safety - Slidev](https://talks.antfu.me/2025/tskaigi/1)

ESLint の Flat Config の話から入って、様々な周辺ツールの紹介をしつつ、lint だけでなく formatter や codemod や JS 以外の言語でも使える話など、もっと ESLint を活用したくなる話が満載でした。  
Config Inspector、一度見て「うおおお」ってなって満足していたんだけれど、インスペクタ上でやれることが多くて色々触ってみたくなりました。

### TypeScriptで実践するクリーンアーキテクチャ ― WebからもCLIからも使えるアプリ設計

スライド: [TypeScriptで実践するクリーンアーキテクチャ ― WebからもCLIからも使えるアプリ設計](https://speakerdeck.com/panda_program/clean-architecture-with-typescript-application)

勘違いされがちなクリーンアーキテクチャについて、勘違いされがちなポイントを押さえつつわかりやすく解説しながら、TS を使った実例まで紹介していました。  
僕もネットで調べてわかった気になって満足していたので、まずクリーンアーキテクチャ本を読まなきゃな、となりました。

全体的に説明がわかりやすかったのが印象的で、特に「依存性逆転の法則」は今まで見てきた説明の中で一番わかりやすかったかも。

### 堅牢なデザインシステムをつくるためのTypeScript活用

スライド: [Bulletproof Design System with TypeScript](https://speakerdeck.com/takanorip/bulletproof-design-system-with-typescript)

デザインシステムのルール守られない問題はそうだよな〜となりつつ、Branded Type で型を区別するの良さそう〜となった。  
弊社の同僚たちが書いた書籍が引用されていて嬉しい気持ちに。

### AI Coding Agent Enablement in TypeScript

スライド: [AI Coding Agents Enablement in TypeScript](https://speakerdeck.com/yukukotani/ai-coding-agents-enablement-in-typescript)

AI 活用事例がめっちゃ進んでて知見の宝庫だった。  
修正指示を出す際に即座に ESLint のカスタムルールを作らせるの、良すぎるので真似していきたい。

### TypeScriptとReactで、WAI-ARIAの属性を正しく利用する

スライド: [TypeScriptとReactで、WAI-ARIAの属性を正しく利用する](https://docs.google.com/presentation/d/1rzznSwA7da7S_lU6qyAFuCN9IC1uDJe44PvDg-uqHjQ/edit?slide=id.p#slide=id.p)

React は `-` が入っていると props が無法地帯になるというの、知らなかった。  
`role` や `aria-*` があまり型と親和性がないのは、言われてみれば確かに。

### TypeScriptとは何であって何でなく、誰のもので、どこへ向かうのか

スピーカーノート: [TSKaigi 2025「TypeScriptとは何であって何でなく、誰のもので、どこへ向かうのか」スピーカーノート](https://zenn.dev/sosukesuzuki/articles/5146c84504445f)

今後、TypeScript がどうなっていくにしろ正しいツールにベットして楽していけるようになりたいなと、そのためのキャッチアップはしっかりしていかなきゃなと、そう思いました。  
まさに技術選定の審美眼だ。

### TypeScriptネイティブ移植観察レポート

スライド: [TypeScriptネイティブ移植観察レポート TSKaigi 2025](https://speakerdeck.com/berlysia/typescript-native-porting-observation-tskaigi-2025)

話題の typescript-go について、移植がどのように進んでいったのかを時系列で説明してくれていた。  
移植の進め方としてとても勉強になるしパワーがすごい。

そしてこういうのが出たときにすぐに触ってみるフットワークの軽さ、最近失いつつあるので取り戻していきたい。

### TypeScript Language Service Plugin で CSS Modules の開発体験を改善する

スライド: [TypeScript Language Service Plugin で CSS Modules の開発体験を改善する](https://speakerdeck.com/mizdra/css-modules-kit)

CSS Modules を使っていて定義元に飛べないの、本当に不便だな〜と思っていた。  
そこに真剣に向き合って解決しつつ OSS 化してるの、尊い。

### 複雑なフォームを継続的に開発していくための技術選定・設計・実装

スライド: [複雑なフォームを継続的に開発していくための技術選定・設計・実装 #tskaigi / #tskaigi2025](https://speakerdeck.com/izumin5210/number-tskaigi2025)

仕事で複雑なフォームのみを毎日つくり続けているのでこれを聞くのをとても楽しみにしていた。

徐々に複雑さを増す事例を出しつつ、設計を改善していくの、流れがよくできていてわかりやすかった。  
自分のプロダクトでは conform を使っているけどやめたすぎてしょうがないので情報としてとても参考になった。改善の道筋が見えた気がする。

### 技術書をソフトウェア開発する - jsprimerの10年から学ぶ継続的メンテナンスの技術

スライド: [技術書をソフトウェア開発する](https://azu.github.io/slide/2025/tskaigi/jsprimer.html)

jsprimer、本当に素晴らしい活動で尊敬している。  
その活動を継続的に続けるためにやっていくことを話されていて、めちゃくちゃソフトウェア開発だった。

お金の話もあって、Contributing Expenses Policy という概念が初見だったので面白かった。よく考えられたシステムだった。

### 機能的凝集の概念を用いて複数ロール、類似の機能を多く含むシステムのフロントエンドのコンポーネントを適切に分割する

スライド: [機能的凝集の概念を用いて 複数ロール、類似の機能を多く含むシステムの フロントエンドのコンポーネントを適切に分割する](https://speakerdeck.com/noritakaikeda/ji-neng-de-ning-ji-nogai-nian-woyong-ite-fu-shu-roru-lei-si-noji-neng-woduo-kuhan-musisutemuno-hurontoendonokonponentowoshi-qie-nifen-ge-suru)

機能的凝集の概念を使ってコンポーネントの出し分けをすることでコンポーネント内に複雑な条件分岐を増やさないようにする話でした。  
条件分岐がネストしまくっているコンポーネントを量産する日々だったので刺さりました。  
ts-pattern でコンポーネントを出し分けるの、見やすくて良さそうだった。

### TS特化Clineプログラミング

スライド: [TS特化Clineプログラミング](https://tskaigi.mizchi.workers.dev/#1)

どんなプロンプトを書けばうまく AI が動いて、どんなプロンプトだとうまく動かないのか、これらを解説しつつ今後のプログラミングで重要になるスキルについての話をされていました。  
魂が震えました。

## スポンサーブース

今年は疲れちゃって全部のスポンサーブースを回ることはできなかったんだけど、NStock 社のノベルティが良すぎた。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">もらった！かわいい～～ <a href="https://twitter.com/hashtag/TSKaigi_Nstock?src=hash&amp;ref_src=twsrc%5Etfw">#TSKaigi_Nstock</a> <a href="https://t.co/V0X5k5Pa4j">pic.twitter.com/V0X5k5Pa4j</a></p>&mdash; nabeliwo (@nabeliwo) <a href="https://twitter.com/nabeliwo/status/1925767754725945775?ref_src=twsrc%5Etfw">May 23, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 感想

個人的な今年の所感は AI コーディング！typescript-go！って感じでした。

TypeScript のビルドはどんどん早くなるし、AI によってコーディングはどんどん早くなるし、早くなってないの僕だけ。  
真面目に書くと、TSKaigi は言語自体の話はもちろん、アプリケーション開発の現場感のある話や、アーキテクチャや設計の話だったり、競プロや型パズルの話とか、とても幅広い領域の話が聞けるのがとても良いところだなと思います。  
(それで言うと昨年は VR やマイコン系などウェブ以外の話もあった気がするけど、今年はそれ系がなかったかも？)

今回はプロポーザル通らなかったし懇親会チケットも取れなかったしと無念も多かったので、来年は全てを取りにいくぞ、と心に決めたのでした。  
改めて運営の皆様、素晴らしいカンファレンスを開いていただき、ありがとうございました！
