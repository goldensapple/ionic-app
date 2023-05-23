### pos 組み立てメモ

```
PC電源をつける（PC電源が入る三本端子のハブが必要）
本番でも、無線wifiではなく有線でネットに繋ぐ
pcとモニターをhdml端子で繋ぐ
モニター電源をつける
タッチパネル用の連携ケーブルでモニターとpcをつなげる
microsoft edgeでgoogle chromeをダウンロード
chromeでショートカット作成でpos appをデスクトップに

https://asas-pos-app.web.app/

pcに、以下からプリンタードライバーをインストールしてプリンター設定を行う
（設定してからテスト印刷をしてみる）
https://www.epson.jp/dl_soft/readme/33863.htm

google remoteを設定
・ASAS守口セルフレジ 017884

pcに、以下のepsonネットコンフィグをダウンロード
https://www.epson.jp/dl_soft/readme/27138.htm


cat端末を操作
黄色ボタンと0ボタンを同時に押す。デフォルトPINは9999で緑ボタン確定。
設定画面でcatのIPaddressを確認
posの設定画面でcatIPを設定。
本番のcatは二週間前に注文しておく
テスト用のcatは、後に返却（ハブ、電源コード、PCとの連携コードの3点も一緒に）


うまくcatに接続できない場合、以下の設定にしてみる
"catIP": "192.168.1.214"
"kitchenPrinterIP": "192.168.1.214"
"logStorage": []
"printerNum": "01"
"serialNum": "0001"

有線でwifiにつなげるのは、pc、cat、printerの三つ


以下を参考にプリンター情報を設定
https://www2.epson.jp/support/manual/TM_M30II_H_TRG_JA_REVB.PDF


epson config (web)入り方
http://{ip address} にアクセス　（守口の場合: http://192.168.1.8）
ID: epson
Pass: {プリンターのシリアル番号}　（守口の場合: X843006709）

でログイン


中々プリンターに接続できない場合は、webにあるepson epos for javascriptをダウンロードをして、サンプルファイルで接続を試みる。

プリンター接続の際に、「MixedContents~...」のエラーがコンソールに出る場合は、chromeページの左上鍵マークを押して、サイトの設定で安全でないコンテンツを許可する設定に変更する。


catはシリアルケーブルのハブを使用して、PCのusb口に挿す。

釣り銭きテストは、1円、5円以外の硬貨、10以上の硬貨を20個ずつ、紙幣は5枚ずつでテスト。（紙幣80000円分、硬貨13200円分、合計93200円分）

釣銭機セットアップは、付属dvdに入っているpdfを見ながら行う。
- バッチファイル“OposSetup.bat”を右クリックして管理者として実行。
- RT-380なので、1をselectしてenter

釣銭機の設定も、プリンター同様







```

#

## develop

[バックオフィス](https://localhost:50443/)
[レジアプリ](http://localhost:8100)

### docker

```
# dockerコンテナを起動する
$ docker-compose up -d
# dockerコンテナに入る
$ docker-compose exec web sh
# ionicアプリをスタート
> ionic serve --address=0.0.0.0
```

### deploy

```
# on docker
> ionic build --prod
# on local
$ firebase deploy
```

・chrome 設定
chrome://flags の Insecure origins treated as secure に vescaJS のエンドポイント（ws://192.168.1.214:3647）
を入れて、enabled にする。

・pos アプリデプロイ方法
ionic build --prod 　
を実行した後、
firebase deploy

・package.json の scripts 部分
firebase の場合:
"scripts": {
"ng": "ng",
"start": "ng serve",
"build": "ng build",
"test": "ng test",
"lint": "ng lint",
"e2e": "ng e2e"
},
aws amplify の場合:
"scripts": {
"start": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ionic-app-scripts serve",
"clean": "ionic-app-scripts clean",
"build": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ionic-app-scripts build",
"lint": "ionic-app-scripts lint"
},
