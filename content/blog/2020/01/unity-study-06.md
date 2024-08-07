---
title: '【Unity勉強】6日目：3Dのゲームを作る'
description: 'ようやく3Dゲームの作り方までたどり着きました。'
date: '2020-01-11'
category: 'tech'
tags: ['unity']
image: ''
alt: ''
---

ちょっと日記に間が空いてしまった。  
やっていくぞ。

引き続き、こちらの書籍を使って勉強をしています。

[Unity2018入門 最新開発環境による簡単3D&2Dゲーム制作 - Amazon](https://www.amazon.co.jp/dp/4797397667)

## これ作った

今回はついに3Dゲームをつくった。サンプルの通りにやっていけば障害物走ができる。  
これが完成したやーつ。

`youtube:https://www.youtube.com/embed/McLzdTco8WI`

音声も流れたりする。  
スタートからゴールにたどり着くまでの秒数を出す、みたいなやつ。そしてハイスコアも保存できたりする。

## 作業メモ

### Standard Assets を使う

まず見た目を作るために Asset Store から必要な素材をダウンロードする。今回は「Standard Assets」というアセットを使用する。

Standard Assets の SampleScenes はゲームを作る上で参考になることがたくさんあるので見ておくと良い。

Standard Assets に入っている MultipurposeCameraRig はタグが Player になっているオブジェクトを自動で追従するようになっているので今回はそのカメラを使う。  
Unity の Tag はオブジェクトを識別するための情報。スクリプトからオブジェクトを識別するために使う。 Player などの使用頻度の高いタグはあらかじめ用意されていて、独自のタグを作ることもできる。

### ステージを作る

ステージ用のオブジェクトとかは Create Empty で空のオブジェクトを作ってその子オブジェクトとすることでまとめてしまうと管理的に見やすくて良い。

オブジェクトにテクスチャ(画像)を貼ることでそれっぽくする。今回は Asset Store から Yughues Free Architectual Materials をインポートして使う。テクスチャをオブジェクトにドラッグ＆ドロップして使用する。

オブジェクトにテクスチャを貼ると Mesh Renderer コンポーネントが追加される。 Mesh Renderer コンポーネントの Materials -> Element 0 で貼られているテクスチャを確認できる。

Unity ではステージの背景としてデフォルトで空が表示されるがこれを変更できる。 Window -> Rendering -> Lighting Settings -> Scene タブ -> Skybox Material でテクスチャを指定する。

### ライトを配置する

Spot Light を配置する。

- Range : 光の届く距離
- Spot Angle : 光の当たる範囲
- Intensity : 光の強さ
- Color : 光の色

Point Light を配置する。  
Point Light とは電球のように特定の光源から放射状に周りを照らすライト。部屋の照明から洞窟のたいまつまで幅広く応用できて便利な反面、処理が重いので多用するとスマートフォンで動作が重くなってしまう。

### 落下判定

落下判定をするには、床より下の位置に落下判定エリアを用意して、そのエリアに触れたら落下したとみなすと良い。  
Cube を作ってステージ全てをカバーできるくらい面積を大きくして、 Mesh Renderer コンポーネントを削除して非表示にする (チェックを外して無効化でも良い)。  
通常はオブジェクトの当たり判定は Unity がオブジェクトに設定された Collider コンポーネントを監視して自動的に行っているが、今回のように落下判定エリアに触れたら何かの処理を行う、みたいなときは自動でやっている当たり判定を止めたい。そういうときは Collider コンポーネントの Is Trigger にチェックを入れると自動で行われる衝突処理を停止して、かわりに当たり判定領域に何かが触れた際にどういった振る舞いにするかをスクリプトで設定できるようになる。

### オーディオ

耳の役割をする Audio Listener コンポーネントと音の発生源の役割をする Audio Source コンポーネントを使う。今回は音源は Asset Store から「Action RPG Music Free」をダウンロードして使う。

Add Component -> Audio -> Audio Source -> AudioClip に音声ファイルをドラッグ＆ドロップ。  
Loop にチェックするとループ再生される。  
Spatial Blend の設定を行うことで音声が立体的になる。近づくと大きくなるし、離れると小さくなる。
Audio Listener はデフォルトで用意されている Main Camera についている。

### その他メモ

- public static で宣言した変数は別のスクリプトから参照できるようになる
- PlayerPrefs はデータのセーブを行ってくれるクラス
  - PlayerPrefs.HasKey("hoge") でセーブデータに hoge という項目があるかどうかを判定できる
- ProBuilder という機能を使うと Unity 上で簡単なモデリングができるので自由な形のステージを作れる

## 感想

Standard Assets におんぶにだっこという感じで正直よくわからなかった。  
もちろん一瞬で3Dのゲームが作れてすごいんだけど、プレイヤーオブジェクトを置くとそれが WASD ですでに自由自在に動かせるようになってたり、カメラを置くとそれが自動でプレイヤーを後ろから追跡したり、便利なんだけどそれがどうやって成立してるのか全く分からないのでツールに使われてる感がすごい。  
まあ便利になってるんだからそれでさっさとゲームを作れよという話なんだけど、僕はどうやって動いているのかが気になってしまうので Standard Assets に入っているオブジェクトの実装をしっかり見て理解していかないとって感じになった。

とりあえずこの速度でここまでのゲームが作れることには素直に感動している。
