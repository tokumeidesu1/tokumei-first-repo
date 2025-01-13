# 猿でもわかるhtml
## 1.htmlとは？
### 1-1 htmlの歴史
htmlの特徴である****タグ****。この**タグ**は、先祖の **Generalized Markup Language**、略して**GML**からの仕様である。
このGMLはIBMのSCRIPT/VSというツールから特徴を引き継いでいて、マークアップ言語としてはGMLが祖先とされる(SCRIPT/VSはテキストフォーマッティング言語で、マークアップではない)
このマークアップ言語の祖先であるGMLから生まれたのが主にHTMLとXMLである。つまり、XMLはHTMLのいとこである。
###### 他にもSVGやRSSなどがあるが詳しいことは自分で調べろ。
### 1-2 htmlってどういうやつ？
htmlはWebページを作るために用いるのはもちろんご存知ですよね。他に重要な言語としてCSSやJSなどが挙げられます。
<と>を用いて内容を囲むのが最低限のルールになっています。この<>内は小文字以外でも動きますが、慣習としてすべて小文字で書くことが推奨されています。
以下に、基本的な**タグ**を挙げます

#### doctype
<!doctype html>
doctypeとはDocument typeの略で、このコードはどのような言語で書かれているかを指します。
###### html以外でこの**タグ**が使われることがあったかというと...
まあとにかく、これがないと拡張子によっては別のxmlなどと認識され表示が**おかしくなることがあります。**

#### a
<a href=""></a>
リンクを設置する**タグ**です。ハイパーリンクと呼ばれる他のウェブサイトへのリンクの他、同じサーバー内のファイルへの移動や、メールの送信用リンクなども設置ができます。
大抵の場合、用いるのは[こういう用途です](https://google.com)。

#### img
```<img  class="fit-picture"  src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"  alt="mozilaのTutorialに用いる画像" />```
<img  class="fit-picture"  src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"  alt="mozilaのTutorialに用いる画像" />

画像を表示する**タグ**です。srcには画像のリンクを入れます。このとき、`http://`または`https://`を付けると**外部サーバー**から、つけなければ**内部**から画像を探します。altは基本的に画像の内容をテキストで表現することで視覚障がいなどのユーザーに優しいサイトにできます。
どういうことかというと<br>
<img  class="fit-picture"  src=""  alt="mozilaのTutorialに用いる画像" />
<br>こういう表示ができるからです。通信制限などでもこのように表示されるため、**大抵の画像につけておくと良いでしょう。**

#### div
<div></div>
この**タグ**はCSSを使う際に用います。複数の場合はclass、単一の場合はid属性でCSSのデザインを指定する際に用います。どういうことかというと

```html
<a href="なんかすごいページ">a</a>
```
という**要素**があったとして、このリンクの文字色を変えるときに
```html
<div id="link-container">
  <a href="なんかすごいページ">a</a>
</div>
```
と書き、CSSで
```css
  #link-container a {
    color: red; /* 文字色を赤に変更 */
  }
```
と指定すれば、a**タグ**の中でもlink-container**タグ**に囲まれた上のリンクのみが赤色になるということです。
という長ったらしい解説はさておき、このdivのような**要素**には種類があり、
総称して **セクショナル要素** や **セクショナルコンテンツ** と呼称されます。

```html
<div>：汎用的なコンテナ
<span>：インライン**要素**のコンテナ
<header>：ページやセクションのヘッダー
<footer>：ページやセクションのフッター
<main>：ページの主要コンテンツ
<section>：セクションを定義
<article>：独立したコンテンツを定義
<aside>：サイドバーなどの補足的なコンテンツ
<nav>：ナビゲーションリンクを囲む
```
こういう感じ。
##### セクショナルコンテンツは正直僕も詳しくないので @yuu8313さんや[chatgpt](https://chat.com)に聞いて下さい
####  html
必ずこの**タグ**で2行目から最後までを囲うのがルールです。

```html
 <html>
      <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Document title</title>
    </head>
      <body>
      </body>
~~~~~~~~~~~~~~~~~~
    </html>
```
囲まないと認識されないので、後述のheadなどと合わせて必ずhtmlにつける必要がある。
#### head
<head>
これは人間の目に見える**タグ**ではない。要するに、ブラウザのページに表示されない内部データを格納する**タグ**。
たとえばタイトル。

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Grandma's Heavy Metal Festival Journal</title>
  <link rel="icon" href="favicon.ico" />
  <link href="main.css" rel="stylesheet" />
  <script src="javascript.js"></script>
</head>
```
というふうにやることがおおい。
中のmetaは**タグ**を持たないメタデータの設定に用い、linkはサイトのアイコンやCSS、scriptはJavaScriptの読み込みにそれぞれ使うことが多い。titleはその名の通りサイト名である。
#### iframe
外部サイトなどを埋め込むときに使う。

```html
<iframe width="1866" height="916" src="https://www.youtube.com/embed/PEbRlW4TX0Y" title="【ゆっくり解説】「哲学的剃刀」を集めて十徳ナイフを作ろう！！！！！！！！！！！" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```
これが
<iframe width="1866" height="916" src="https://www.youtube.com/embed/PEbRlW4TX0Y" title="【ゆっくり解説】「哲学的剃刀」を集めて十徳ナイフを作ろう！！！！！！！！！！！" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
こうなる。
実は誰でも簡単に出せる

###### githubでこれが見えてるといいけど。