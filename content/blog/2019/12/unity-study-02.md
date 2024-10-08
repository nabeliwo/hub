---
title: '【Unity勉強】2日目：Unity の基本的な概念を知る'
description: 'Unity の画面の意味やら基本的な概念を学んだ。'
date: '2019-12-25'
category: 'tech'
tags: ['unity']
image: ''
alt: ''
---

奇しくもクリスマスの投稿となってしまいましたが、2日目書きます。

## ゲームばっかりしてました

Unity 始めるぞ〜〜と息巻いたあの日から数日、特にその後に Unity 日記を綴ることもなかった僕が何をしていたかというと、ゲームをしていました。

そう、ゲームをしていました。

サバイバルクラフトゲームを作りたい気持ちが高まった結果いろんなクラフトゲーをやってしまいました。  
社の同僚とともに [The Forest](https://store.steampowered.com/agecheck/app/242760/?l=japanese) を始めて食人族と戦いながらログハウスを作り、家族とともに[ドラクエビルダーズ2](http://www.dragonquest.jp/builders2/)を始めて自分だけの素敵な島を作り、そんな日々を過ごしていました。

そんな日々を幾日か過ごした僕はふと我に帰り、再びデスクの前に座り Unity を起動するのであった。

プロローグ終わり。

## とりあえず本を読みながら勉強してる

こういう「勉強するぞ〜〜」って時にはまず本から読みたくなる性分なのでとりあえずかなり昔に買って積読状態になっていたこちらの本を読み始めました。

[Unity2018入門 最新開発環境による簡単3D&2Dゲーム制作](https://www.amazon.co.jp/dp/4797397667)

僕が持ってるのは2018でしたが今は2019が出てるので今買う人はそっちのが良さそう。  
ということでしばらくは読書しつつ写経しつつの読書メモになりそう。

## Unity を立ち上げた時の画面

Unity の画面は大きく分けて以下のタブに分かれている。これらの配置はユーザーが自由に変更できる。

- **Game**: カメラを通してみた実際のゲーム画面を表示している
- **Scene**: ゲームの画面の編集をする画面
- **Hierarchy**: ゲームを構成するオブジェクトを格納する
- **Project**: ゲーム作成に必要な全てのデータを格納する。実態はフォルダ
- **Inspector**: オブジェクトの設定を編集する。オブジェクトの設定をするための機能を Component と呼ぶ。
- **Console**: エラーや警告のログを表示する

## 基本的な概念

### オブジェクト

Unity では全ての要素をオブジェクトと呼ぶ。  
細かく言うと Hierarchy に追加できるものをオブジェクト、単独では追加できないものをアセットと呼ぶ。例えばテクスチャやスクリプトはアセット。

オブジェクトにはデフォルトで Transform Component というコンポーネントがついており、そのオブジェクトの位置・角度・大きさをコンポーネントで管理している。

### レイヤー構造

Unity のプロジェクトを始める際は、まず Project をつくる(一つのゲームに一つの Project)。  
そこに Scene を追加する。Scene の数は Project の規模によって変わる。  
Scene に オブジェクト(GameObject と呼ぶ)を配置する。そして GameObject に Component を設定する。

つまりプロジェクトのレイヤー構造としてはこんな感じ。

```
Project
  ┣ Scene
  ┃   ┣ GameObject
  ┃   ┃     ┗ Component
  ┃   ┗ GameObject
  ┃         ┣ Component
  ┃         ┗ Component
  ┃
  ┗ Scene
      ┗ GameObject
           ┣ Component
           ┣ Component
           ┗ Component
```

Scene, GameObject, Component はそれぞれ親に対して複数紐付く。

## オブジェクトの座標について

座標にはグローバル座標、ローカル座標というものがある。  
グローバル座標は原点が Scene の中心、ローカル座標はそれぞれのオブジェクトの中心を基準にする。

複数のオブジェクトを親子関係にした場合、子の座標は親オブジェクトの中心からの相対的な値になる。

## Scene にデフォルトで設置されるオブジェクト

Scene を作るとデフォルトで Main Camera と Directional Light が設置されている。  
Main Camera はゲーム画面を映し出す役割をもったオブジェクト。このカメラに映った映像を Game のタブで見られる。 Directional Light に関しては後述。

## ライトについて

ライトにはいくつかの種類がある。

- Directional Light
  - 太陽光のように設定した方向から均一な光を当てる。 Scene を作るとデフォルトで一つ置かれている
- Point Light
  - 配置場所から全方向に向けて光を放つ
- Spotlight
  - 配置場所から特定の方向に向けた光を放つ
- Area Light
  - 光源が四角形のライト(使用するにはライトのベイクが必要)

**ベイクとは**

そのオブジェクトの位置は動かないということを前提にして、ライトが当たり光っているところ、影になるところを事前計算すること。

## 疑問

疑問に思ったことをメモしておく。

- チーム開発はどうやるのか
  - バージョン管理はどうやるのか
  - Project がただのフォルダであるならそれを Git で管理すれば良い感じ？
  - Unity の機能でそれに類するものとかあったりするのかな
  - 他の人の Unity プロジェクトの管理方法を見てみたい

的なことをふっと呟いたら友人が Unity.gitignore を紹介してくれた。  
ということはやっぱり Git 管理なのか。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">楽しみにしております。<br><br>ちなみにGitignoreは、<a href="https://t.co/S1hlk82NXc">https://t.co/S1hlk82NXc</a><br>をいれておけばよいですよ</p>&mdash; ぺペンゴツ (@ppengotsu) <a href="https://twitter.com/ppengotsu/status/1204205117982953472?ref_src=twsrc%5Etfw">December 10, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

次回までに調べておく。

## 感想

今日学んだことはまあなんとなくあたりがついていたというか、そして初見の知識としてもとても理解しやすい話だったのでやっぱり体系的な本の序盤はこんな感じのやさしさか、となった。  
この続きは実際に手を動かしてプロジェクトを作る感じらしいので期待。終わり。
