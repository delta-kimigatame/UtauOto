import * as h from "iconv-lite";
class n {
  /**
   * @param dirpath_ 原音ルートからの相対パス
   * @param record oto.ini 1行分相当のテキストデータ {filename}={alias},{offset},{velocity},{blank},{pre},{overlap}
   */
  constructor(t, s) {
    this.dirpath_ = t, this.record = s, this._dirpath = "", this._filename = "", this._alias = "", this._offset = 0, this._overlap = 0, this._pre = 0, this._velocity = 0, this._blank = 0, this.dirpath = t;
    const e = s.split("=");
    this.filename = e[0];
    const i = e[1].split(",");
    this.alias = i[0], this.offset = i[1], this.overlap = i[5], this.pre = i[4], this.velocity = i[2], this.blank = i[3];
  }
  /**
   * 原音ルートからの相対パス
   */
  set dirpath(t) {
    this._dirpath = t;
  }
  /**ファイル名*/
  set filename(t) {
    this._filename = t;
  }
  /**エイリアス */
  set alias(t) {
    this._alias = t;
  }
  /** オフセット(左ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set offset(t) {
    typeof t == "number" ? this._offset = t : Number.isNaN(parseFloat(t)) ? (console.log(t + "is not Numer"), this._offset = 0) : this._offset = parseFloat(t);
  }
  /** オーバーラップ。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set overlap(t) {
    typeof t == "number" ? this._overlap = t : Number.isNaN(parseFloat(t)) ? (console.log(t + "is not Numer"), this._overlap = 0) : this._overlap = parseFloat(t);
  }
  /** 先行発声。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set pre(t) {
    typeof t == "number" ? this._pre = t : Number.isNaN(parseFloat(t)) ? (console.log(t + "is not Numer"), this._pre = 0) : this._pre = parseFloat(t);
  }
  /** 子音部(固定範囲)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set velocity(t) {
    typeof t == "number" ? this._velocity = t : Number.isNaN(parseFloat(t)) ? (console.log(t + "is not Numer"), this._velocity = 0) : this._velocity = parseFloat(t);
  }
  /** ブランク(右ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set blank(t) {
    typeof t == "number" ? this._blank = t : Number.isNaN(parseFloat(t)) ? (console.log(t + "is not Numer"), this._blank = 0) : this._blank = parseFloat(t);
  }
  /**原音ルートからの相対パス */
  get dirpath() {
    return this._dirpath;
  }
  /**ファイル名 */
  get filename() {
    return this._filename;
  }
  /**エイリアス */
  get alias() {
    return this._alias;
  }
  /**オフセット(左ブランク) */
  get offset() {
    return this._offset;
  }
  /**オーバーラップ */
  get overlap() {
    return this._overlap;
  }
  /**先行発声 */
  get pre() {
    return this._pre;
  }
  /**子音部(固定範囲) */
  get velocity() {
    return this._velocity;
  }
  /**ブランク(右ブランク) */
  get blank() {
    return this._blank;
  }
}
const f = /^[^=]+\.wav=[^,]*,(?:-?(?:\d+(?:\.\d+)?|\.\d+))?,(?:-?(?:\d+(?:\.\d+)?|\.\d+))?,(?:-?(?:\d+(?:\.\d+)?|\.\d+))?,(?:-?(?:\d+(?:\.\d+)?|\.\d+))?,(?:-?(?:\d+(?:\.\d+)?|\.\d+))?$/;
class p {
  constructor() {
    this.datas = {}, this.records = {};
  }
  /**
   * oto.iniに含まれるエイリアス数を返す。
   * この操作は、ParseOtoを使ってoto.iniファイルを読み込んだ際には正常に動作するが、
   * SetAlias や SetParams、RemoveFileName、RemoveAlias などの編集操作を行うと正常に動作しないため注意が必要である。
   * ToDo:SetAlias、SetParams、RemoveFileName、RemoveAliasの修正
   */
  get otoCount() {
    return Object.keys(this.records).length;
  }
  /**
   * oto.iniのデータを分割し、datasとaliasに格納する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param data oto.iniのデータ
   */
  ParseOto(t, s) {
    let e = s;
    s.charCodeAt(0) === 65279 && (e = s.slice(1)), e.replace(/\r\n/g, `
`).split(`
`).forEach((o) => {
      if (o === "" || !f.test(o))
        return;
      const r = new n(t, o);
      this.datas[t] && this.datas[t][r.filename] ? this.datas[t][r.filename][r.alias] = r : this.datas[t] ? this.datas[t][r.filename] = { [r.alias]: r } : this.datas[t] = { [r.filename]: { [r.alias]: r } };
      const a = r.alias !== "" ? r.alias : r.filename.slice(0, -4);
      Object.keys(this.records).includes(a) || (this.records[a] = r);
    });
  }
  /**
   * dirpath,filename,aliasで指定したotoのパラメータを一括で変更する。
   * キーが存在しない場合作成する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias エイリアス
   * @param offset オフセット(左ブランク)
   * @param overlap オーバーラップ
   * @param pre 先行発声
   * @param velocity 子音部(固定範囲)
   * @param blank ブランク(右ブランク)
   */
  SetParams(t, s, e, i, o, r, a, d) {
    if (this.HasOtoRecord(t, s, e))
      this.datas[t][s][e].offset = i, this.datas[t][s][e].overlap = o, this.datas[t][s][e].pre = r, this.datas[t][s][e].velocity = a, this.datas[t][s][e].blank = d;
    else {
      const c = s + "=" + e + "," + i.toFixed(3) + "," + a.toFixed(3) + "," + d.toFixed(3) + "," + r.toFixed(3) + "," + o.toFixed(3);
      this.datas[t] && this.datas[t][s] ? this.datas[t][s][e] = new n(t, c) : this.datas[t] ? this.datas[t][s] = {
        [e]: new n(t, c)
      } : this.datas[t] = {
        [s]: {
          [e]: new n(t, c)
        }
      };
    }
  }
  /**
   * エイリアスを変更する。
   * 元のエイリアスが存在しない場合、空のOtoRecordを作成する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param newAlias 新しいエイリアス
   */
  SetAlias(t, s, e, i) {
    if (this.HasOtoRecord(t, s, e))
      this.datas[t][s][i] = this.datas[t][s][e], delete this.datas[t][s][e], this.datas[t][s][i].alias = i;
    else {
      const o = s + "=" + i + ",0,0,0,0,0";
      this.datas[t][s][i] = new n(t, o);
    }
  }
  /**
   * オフセット値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param offset オフセット(左ブランク)
   */
  SetOffset(t, s, e, i) {
    this.HasOtoRecord(t, s, e) ? this.datas[t][s][e].offset = i : this.OutputHasNotKeyLog(t, s, e);
  }
  /**
   * オフセット値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param overlap オーバーラップ
   */
  SetOverlap(t, s, e, i) {
    this.HasOtoRecord(t, s, e) ? this.datas[t][s][e].overlap = i : this.OutputHasNotKeyLog(t, s, e);
  }
  /**
   * 先行発声値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre 先行発声
   */
  SetPre(t, s, e, i) {
    this.HasOtoRecord(t, s, e) ? this.datas[t][s][e].pre = i : this.OutputHasNotKeyLog(t, s, e);
  }
  /**
   * 子音部値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre 子音部(固定範囲)
   */
  SetVelocity(t, s, e, i) {
    this.HasOtoRecord(t, s, e) ? this.datas[t][s][e].velocity = i : this.OutputHasNotKeyLog(t, s, e);
  }
  /**
   * ブランク値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre ブランク(右ブランク)
   */
  SetBlank(t, s, e, i) {
    this.HasOtoRecord(t, s, e) ? this.datas[t][s][e].blank = i : this.OutputHasNotKeyLog(t, s, e);
  }
  /**
   * エイリアスの有無を確認する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @returns this.datas[dirPath][filename][alias]が存在すればtrue、しなければfalse
   */
  HasOtoRecord(t, s, e) {
    return !!(this.datas[t] && this.datas[t][s] && this.datas[t][s][e]);
  }
  /**
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   */
  OutputHasNotKeyLog(t, s, e) {
    console.warn(
      "dirPath:" + t + `
 filename:` + s + `
 alias:` + e + "は存在しません。"
    );
  }
  /**
   * 指定したOtoのレコードを返す。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @returns this.datas[dirPath][filename][alias]
   */
  GetRecord(t, s, e) {
    return this.HasOtoRecord(t, s, e) ? this.datas[t][s][e] : null;
  }
  /**
   * エイリアスに該当するoto.iniのレコードを返す
   * @param alias
   * @returns
   */
  GetRecordFromAlias(t) {
    return Object.keys(this.records).includes(t) ? this.records[t] : null;
  }
  /**
   * oto.iniを読み込んでdatasに格納する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param otoPath oto.iniのファイルパス
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   */
  InputOto(t, s, e = "SJIS") {
    const i = new FileReader();
    i.addEventListener("load", () => {
      typeof i.result == "string" ? this.ParseOto(t, i.result) : console.error("file can't read");
    }), i.readAsText(s, e);
  }
  /**
   * oto.iniを読み込んでdatasに格納する(async/await対応)
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param otoPath oto.iniのファイルパス
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   */
  async InputOtoAsync(t, s, e = "SJIS") {
    const i = new FileReader();
    return i.readAsText(s, e), new Promise((o, r) => {
      i.addEventListener("load", () => {
        typeof i.result == "string" ? (this.ParseOto(t, i.result), o()) : (console.error("file can't read"), r("file can't read"));
      });
    });
  }
  /**
   * OtoのデータをFileオブジェクトに出力する。
   * 別途URL.createObjectURLを使用して、ダウンロードすることを想定
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   * @returns dirPath毎のoto.iniのFileオブジェクト
   */
  OutputOto(t = "SJIS") {
    const s = new Array();
    for (const e in this.datas) {
      const i = new Array();
      for (const o in this.datas[e])
        for (const r in this.datas[e][o])
          i.push(
            this.datas[e][o][r].filename + "=" + this.datas[e][o][r].alias + "," + this.datas[e][o][r].offset.toFixed(3) + "," + this.datas[e][o][r].velocity.toFixed(3) + "," + this.datas[e][o][r].blank.toFixed(3) + "," + this.datas[e][o][r].pre.toFixed(3) + "," + this.datas[e][o][r].overlap.toFixed(3)
          );
      if (t === "SJIS") {
        const o = new File(
          [h.encode(i.join(`\r
`), "Windows-31j")],
          e,
          { type: "text/plain;charset=shift-jis" }
        );
        s.push(o);
      } else {
        const o = new File([i.join(`\r
`)], e, {
          type: "text/plain;charset=utf-8"
        });
        s.push(o);
      }
    }
    return s;
  }
  GetJson() {
    return JSON.stringify(this.datas);
  }
  /**
   * oto.iniの一覧を文字列で返す
   * @returns oto.iniの一覧
   */
  GetLines() {
    const t = {};
    for (const s in this.datas) {
      const e = new Array();
      for (const i in this.datas[s])
        for (const o in this.datas[s][i])
          e.push(
            this.datas[s][i][o].filename + "=" + this.datas[s][i][o].alias + "," + this.datas[s][i][o].offset.toFixed(3) + "," + this.datas[s][i][o].velocity.toFixed(3) + "," + this.datas[s][i][o].blank.toFixed(3) + "," + this.datas[s][i][o].pre.toFixed(3) + "," + this.datas[s][i][o].overlap.toFixed(3)
          );
      t[s] = e;
    }
    return t;
  }
  /**
   * サブディレクトリとファイル名を指定して、指定したファイル名のレコードをすべて削除する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename 削除するwavファイルのoto.iniからの相対パス
   */
  RemoveFileName(t, s) {
    Object.keys(this.datas).includes(t) && Object.keys(this.datas[t]).includes(s) && delete this.datas[t][s];
  }
  /**
   * サブディレクトリとファイル名とエイリアスを指定して、指定したレコードを削除する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 削除するエイリアス
   */
  RemoveAlias(t, s, e) {
    Object.keys(this.datas).includes(t) && Object.keys(this.datas[t]).includes(s) && Object.keys(this.datas[t][s]).includes(e) && delete this.datas[t][s][e];
  }
  /**
   * サブディレクトリを指定してファイル名一覧を取得する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @returns oto.iniからwavファイルまでの相対パスの一覧
   */
  GetFileNames(t) {
    const s = new Array();
    if (Object.keys(this.datas).includes(t))
      for (const e in this.datas[t])
        s.includes(e) || s.push(e);
    return s;
  }
  /**
   * サブディレクトリとファイル名を指定してエイリアスの一覧を取得する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @returns 指定したファイルのエイリアスの一覧
   */
  GetAliases(t, s) {
    const e = new Array();
    if (Object.keys(this.datas).includes(t) && Object.keys(this.datas[t]).includes(s))
      for (const i in this.datas[t][s])
        e.includes(i) || e.push(i);
    return e;
  }
  /**
   * 指定した文字列に部分一致するエイリアスをすべて返す。
   * @param searchString 検索する文字列
   * @returns 部分一致するエイリアスの一覧
   */
  SearchAliases(t) {
    const s = [];
    for (const e in this.datas)
      for (const i in this.datas[e])
        for (const o in this.datas[e][i])
          o.includes(t) && s.push(o);
    return s;
  }
}
export {
  p as Oto
};
