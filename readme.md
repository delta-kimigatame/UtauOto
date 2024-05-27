# utauoto
飴屋／菖蒲氏によって公開されている、Windows向けに作成された歌声合成ソフトウェア「UTAU」におけるアノテーションデータ(oto.ini)を取り扱うためのTypeScriptライブラリです。

UTAU公式サイト(http://utau2008.web.fc2.com/)

本家UTAUがShift-Jisベースであり、一部utf-8に対応している状況のため、本ライブラリも標準ではShift-Jisを想定しています。

# 導入方法
```npm install utauoto```

# 使い方
```javascript
import {Oto} from "utauoto";

const oto = new Oto();

// oto.iniファイルの読込
// sub_dir_pathは原音ルートからoto.iniがあるdirectoryまでの相対パス
// target.files[0]は別途HTMLから読み込んだFILEオブジェクト
oto.InputOto(sub_dir_path, target.files[0]);

// エイリアスの追加
// 既に存在するエイリアスのパラメータ一括変更も同様
oto.setParams(sub_dir_path, filename, alias, offset, overlap, pre, velocity, blank);

// エイリアスの変更
oto.setAlias(sub_dir_path, filename, alias, newAlias);

// オフセットの変更
oto.setOffset(sub_dir_path, filename, alias, offset);

// oto.iniの書き出し
const iniFiles: Array<File> = oto.OutputOto();
// これで取得できるurlをHTML側でダウンロードする。
URL.createObjectURL(iniFiles[0]);

```

# APIリファレンス
https://delta-kimigatame.github.io/UtauOto/