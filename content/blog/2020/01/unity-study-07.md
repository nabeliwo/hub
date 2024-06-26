---
title: '【Unity勉強】7日目：モバイル対応をする'
description: '個人的にはそんなに興味がないんだけど一応モバイルへの対応の仕方も読んでみた。'
date: '2020-01-12'
category: 'tech'
tags: ['unity']
image: ''
alt: ''
---

ゲームをやるなら PC or コンシューマというポリシーのもとに生きておりスマホでゲームをすることを避けている僕なのですが、一応読んでいる書籍に項目があったのでやってみました。

引き続き、こちらの書籍を使って勉強をしています。

[Unity2018入門 最新開発環境による簡単3D&2Dゲーム制作 - Amazon](https://www.amazon.co.jp/dp/4797397667)

## 作業メモ

File -> Build Settings -> iOS を選択 -> Switch Platform でプラットフォームが iOS になる。ここの変換がめちゃくちゃ時間がかかった。  
Game -> Free Aspect をクリックでアスペクト比を iPhone に合わせる。

ちなみにプラットフォームを変更するとゲームを実行してもキーボードの操作は受け付けなくなる。なので Standard Assets の CrossPlatformInput を使ってジョイスティックを設定する。

スマホは PC と違ってスペックが低いので処理負荷を下げる必要がある。なので Occlusion Culling を使って処理負荷を下げる。  
Unity ではカメラの範囲に入っていないオブジェクトは描画しないが、カメラの範囲ではあるが他のオブジェクトによって遮られてカメラに映っていないオブジェクトは描画している。その状態のものを描画しない機能を Occlusion Culling と呼ぶ。

オブジェクトを選択して Inspector ウィンドウで Static にチェックを入れて、 Window -> Rendering -> Occlusion Culling -> Visualization -> Bake をクリック。  
これで対象のオブジェクトに Occlusion Culling が適用される。

この後、実際にスマホ用にビルドしてスマホで動かしてみる、という工程があったのだがそのために mac に作業を移して iPhone 繋いで xcode 開いてみたいなのが必要だったので、めんどくささのために今回はやらなかった。

## 感想

今回も Standard Assets 様のおかげで僕は何もせずに画面タップによる操作が作れてしまった。

スマホゲーム自体に興味はないので今回は最後までやらなかったが、スマホに向けて処理負荷を下げるとか、キーボード以外の操作インターフェースを用意する、とかはスマホかどうかに関係なく役に立ちそうな知識でよかった。

今回でついに書籍一冊分終わったので、次は簡単な2Dのゲームと3Dのゲームを自分で一つずつ作って見ようと思う。  
それが終わったら VR 向けの Unity 的な勉強をしていきたい。

終わり。
