/**
 * UTAU原音設定ファイル(oto.ini)の1行毎のレコードを扱います。
 */

export class OtoRecord {
  private _dirpath: string;
  private _filename: string;
  private _alias: string;
  private _offset: number;
  private _overlap: number;
  private _pre: number;
  private _velocity: number;
  private _blank: number;

  /**
   * @param dirpath_ 原音ルートからの相対パス
   * @param record oto.ini 1行分相当のテキストデータ {filename}={alias},{offset},{velocity},{blank},{pre},{overlap}
   */
  constructor(private dirpath_: string, private record: string) {
    this._dirpath = "";
    this._filename = "";
    this._alias = "";
    this._offset = 0.0;
    this._overlap = 0.0;
    this._pre = 0.0;
    this._velocity = 0.0;
    this._blank = 0.0;

    this.dirpath = dirpath_;
    const splitByEqual: string[] = record.split("=");
    this.filename = splitByEqual[0];
    const splitByComma: string[] = splitByEqual[1].split(",");
    this.alias = splitByComma[0];
    this.offset = splitByComma[1];
    this.overlap = splitByComma[5];
    this.pre = splitByComma[4];
    this.velocity = splitByComma[2];
    this.blank = splitByComma[3];
  }

  /**
   * 原音ルートからの相対パス
   */
  set dirpath(value: string) {
    this._dirpath = value;
  }
  /**ファイル名*/
  set filename(value: string) {
    this._filename = value;
  }

  /**エイリアス */
  set alias(value: string) {
    this._alias = value;
  }

  /** オフセット(左ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set offset(value: string | number) {
    if (typeof value === "number") {
      this._offset = value;
    } else if (!Number.isNaN(parseFloat(value))) {
      this._offset = parseFloat(value);
    } else {
      console.log(value + "is not Numer");
      this._offset = 0;
    }
  }

  /** オーバーラップ。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set overlap(value: string | number) {
    if (typeof value === "number") {
      this._overlap = value;
    } else if (!Number.isNaN(parseFloat(value))) {
      this._overlap = parseFloat(value);
    } else {
      console.log(value + "is not Numer");
      this._overlap = 0;
    }
  }
  /** 先行発声。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set pre(value: string | number) {
    if (typeof value === "number") {
      this._pre = value;
    } else if (!Number.isNaN(parseFloat(value))) {
      this._pre = parseFloat(value);
    } else {
      console.log(value + "is not Numer");
      this._pre = 0;
    }
  }
  /** 子音部(固定範囲)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set velocity(value: string | number) {
    if (typeof value === "number") {
      this._velocity = value;
    } else if (!Number.isNaN(parseFloat(value))) {
      this._velocity = parseFloat(value);
    } else {
      console.log(value + "is not Numer");
      this._velocity = 0;
    }
  }
  /** ブランク(右ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
  set blank(value: string | number) {
    if (typeof value === "number") {
      this._blank = value;
    } else if (!Number.isNaN(parseFloat(value))) {
      this._blank = parseFloat(value);
    } else {
      console.log(value + "is not Numer");
      this._blank = 0;
    }
  }

  /**原音ルートからの相対パス */
  get dirpath(): string {
    return this._dirpath;
  }

  /**ファイル名 */
  get filename(): string {
    return this._filename;
  }

  /**エイリアス */
  get alias(): string {
    return this._alias;
  }

  /**オフセット(左ブランク) */
  get offset(): number {
    return this._offset;
  }

  /**オーバーラップ */
  get overlap(): number {
    return this._overlap;
  }

  /**先行発声 */
  get pre(): number {
    return this._pre;
  }

  /**子音部(固定範囲) */
  get velocity(): number {
    return this._velocity;
  }

  /**ブランク(右ブランク) */
  get blank(): number {
    return this._blank;
  }
}
