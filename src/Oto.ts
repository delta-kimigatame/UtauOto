/**
 * UTAU原音設定ファイルを扱います。
 */

import OtoRecord from "./OtoRecord";
import * as iconv from "iconv-lite";

export default class Oto {
  private datas: {
    [dirPath: string]: { [filename: string]: { [alias: string]: OtoRecord } };
  };

  constructor() {
    this.datas = {};
  }

  /**
   * oto.iniのデータを分割し、datasに格納する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param data oto.iniのデータ
   */
  ParseOto(dirPath: string, data: string) {
    const lines: string[] = data.replace("\r\n", "\n").split("\n");
    lines.forEach((line) => {
      if (line === "") {
        //**空行は無視する */
        return;
      }
      const record = new OtoRecord(dirPath, line);
      if (this.datas[dirPath] && this.datas[dirPath][record.filename]) {
        this.datas[dirPath][record.filename][record.alias] = record;
      } else if (this.datas[dirPath]) {
        this.datas[dirPath][record.filename] = { [record.alias]: record };
      } else {
        this.datas[dirPath] = { [record.filename]: { [record.alias]: record } };
      }
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
  SetParams(
    dirPath: string,
    filename: string,
    alias: string,
    offset: number,
    overlap: number,
    pre: number,
    velocity: number,
    blank: number
  ): void {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].offset = offset;
      this.datas[dirPath][filename][alias].overlap = overlap;
      this.datas[dirPath][filename][alias].pre = pre;
      this.datas[dirPath][filename][alias].velocity = velocity;
      this.datas[dirPath][filename][alias].blank = blank;
    } else {
      const line =
        filename +
        "=" +
        alias +
        "," +
        offset.toFixed(3) +
        "," +
        velocity.toFixed(3) +
        "," +
        blank.toFixed(3) +
        "," +
        pre.toFixed(3) +
        "," +
        overlap.toFixed(3);
      if (this.datas[dirPath] && this.datas[dirPath][filename]) {
        this.datas[dirPath][filename][alias] = new OtoRecord(dirPath, line);
      } else if (this.datas[dirPath]) {
        this.datas[dirPath][filename] = {
          [alias]: new OtoRecord(dirPath, line),
        };
      } else {
        this.datas[dirPath] = {
          [filename]: {
            [alias]: new OtoRecord(dirPath, line),
          },
        };
      }
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
  SetAlias(dirPath: string, filename: string, alias: string, newAlias: string) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][newAlias] =
        this.datas[dirPath][filename][alias];
      delete this.datas[dirPath][filename][alias];
      this.datas[dirPath][filename][newAlias].alias = newAlias;
    } else {
      const line = filename + "=" + newAlias + ",0,0,0,0,0";
      this.datas[dirPath][filename][newAlias] = new OtoRecord(dirPath, line);
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
  SetOffset(dirPath: string, filename: string, alias: string, offset: number) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].offset = offset;
    } else {
      this.OutputHasNotKeyLog(dirPath, filename, alias);
    }
  }
  /**
   * オフセット値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param overlap オーバーラップ
   */
  SetOverlap(
    dirPath: string,
    filename: string,
    alias: string,
    overlap: number
  ) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].overlap = overlap;
    } else {
      this.OutputHasNotKeyLog(dirPath, filename, alias);
    }
  }
  /**
   * 先行発声値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre 先行発声
   */
  SetPre(dirPath: string, filename: string, alias: string, pre: number) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].pre = pre;
    } else {
      this.OutputHasNotKeyLog(dirPath, filename, alias);
    }
  }
  /**
   * 子音部値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre 子音部(固定範囲)
   */
  SetVelocity(
    dirPath: string,
    filename: string,
    alias: string,
    velocity: number
  ) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].velocity = velocity;
    } else {
      this.OutputHasNotKeyLog(dirPath, filename, alias);
    }
  }
  /**
   * ブランク値を変更する。
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @param pre ブランク(右ブランク)
   */
  SetBlank(dirPath: string, filename: string, alias: string, blank: number) {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      this.datas[dirPath][filename][alias].blank = blank;
    } else {
      this.OutputHasNotKeyLog(dirPath, filename, alias);
    }
  }
  /**
   * エイリアスの有無を確認する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @returns this.datas[dirPath][filename][alias]が存在すればtrue、しなければfalse
   */
  HasOtoRecord(dirPath: string, filename: string, alias: string): boolean {
    if (
      this.datas[dirPath] &&
      this.datas[dirPath][filename] &&
      this.datas[dirPath][filename][alias]
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   */
  OutputHasNotKeyLog(dirPath: string, filename: string, alias: string): void {
    console.warn(
      "dirPath:" +
        dirPath +
        "\n filename:" +
        filename +
        "\n alias:" +
        alias +
        "は存在しません。"
    );
  }
  /**
   * 指定したOtoのレコードを返す。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @param alias 現在のエイリアス
   * @returns this.datas[dirPath][filename][alias]
   */
  GetRecord(
    dirPath: string,
    filename: string,
    alias: string
  ): OtoRecord | null {
    if (this.HasOtoRecord(dirPath, filename, alias)) {
      return this.datas[dirPath][filename][alias];
    } else {
      return null;
    }
  }

  /**
   * oto.iniを読み込んでdatasに格納する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param otoPath oto.iniのファイルパス
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   */
  InputOto(dirPath: string, oto: Blob, encoding = "SJIS"): void {
    const reader: FileReader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        this.ParseOto(dirPath, reader.result);
      } else {
        console.error("file can't read");
      }
    });
    reader.readAsText(oto, encoding);
  }
  /**
   * oto.iniを読み込んでdatasに格納する(async/await対応)
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param otoPath oto.iniのファイルパス
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   */
  async InputOtoAsync(
    dirPath: string,
    oto: Blob,
    encoding = "SJIS"
  ): Promise<void> {
    const reader: FileReader = new FileReader();
    reader.readAsText(oto, encoding);
    return new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
          this.ParseOto(dirPath, reader.result);
          resolve()
        } else {
          console.error("file can't read");
          reject("file can't read")
        }
      });
    });
  }

  /**
   * OtoのデータをFileオブジェクトに出力する。
   * 別途URL.createObjectURLを使用して、ダウンロードすることを想定
   * @param encoding 読み込むotoの文字コード、標準はSJIS
   * @returns dirPath毎のoto.iniのFileオブジェクト
   */
  OutputOto(encoding = "SJIS"): Array<File> {
    const resultUrls: Array<File> = new Array();
    for (const dirPath in this.datas) {
      const lines: Array<string> = new Array();
      for (const filename in this.datas[dirPath]) {
        for (const alias in this.datas[dirPath][filename]) {
          lines.push(
            this.datas[dirPath][filename][alias].filename +
              "=" +
              this.datas[dirPath][filename][alias].alias +
              "," +
              this.datas[dirPath][filename][alias].offset.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].velocity.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].blank.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].pre.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].overlap.toFixed(3)
          );
        }
      }
      if ((encoding = "SJIS")) {
        const iniFile = new File(
          [iconv.encode(lines.join("\r\n"), "Windows-31j")],
          dirPath,
          { type: "text/plane;charset=shift-jis" }
        );
        resultUrls.push(iniFile);
      } else {
        const iniFile = new File([lines.join("\r\n")], dirPath, {
          type: "text/plane;charset=utf-8",
        });
        resultUrls.push(iniFile);
      }
    }

    return resultUrls;
  }

  GetJson(): string {
    return JSON.stringify(this.datas);
  }

  /**
   * oto.iniの一覧を文字列で返す
   * @returns oto.iniの一覧
   */
  GetLines(): { [key: string]: Array<string> } {
    const result: { [key: string]: Array<string> } = {};
    for (const dirPath in this.datas) {
      const lines: Array<string> = new Array();
      for (const filename in this.datas[dirPath]) {
        for (const alias in this.datas[dirPath][filename]) {
          lines.push(
            this.datas[dirPath][filename][alias].filename +
              "=" +
              this.datas[dirPath][filename][alias].alias +
              "," +
              this.datas[dirPath][filename][alias].offset.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].velocity.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].blank.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].pre.toFixed(3) +
              "," +
              this.datas[dirPath][filename][alias].overlap.toFixed(3)
          );
        }
      }
      result[dirPath] = lines;
    }
    return result;
  }

  /**
   * サブディレクトリを指定してファイル名一覧を取得する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @returns oto.iniからwavファイルまでの相対パスの一覧
   */
  GetFileNames(dirPath: string): Array<string> {
    const result: Array<string> = new Array();
    if (Object.keys(this.datas).includes(dirPath)) {
      for (const filename in this.datas[dirPath]) {
        if (!result.includes(filename)) {
          result.push(filename);
        }
      }
    }
    return result;
  }
  /**
   * サブディレクトリとファイル名を指定してエイリアスの一覧を取得する。
   * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
   * @param filename oto.iniからwavファイルまでの相対パス
   * @returns 指定したファイルのエイリアスの一覧
   */
  GetAliases(dirPath: string, filename: string): Array<string> {
    const result: Array<string> = new Array();
    if (Object.keys(this.datas).includes(dirPath)) {
      if (Object.keys(this.datas[dirPath]).includes(filename)) {
        for (const alias in this.datas[dirPath][filename]) {
          if (!result.includes(alias)) {
            result.push(alias);
          }
        }
      }
    }
    return result;
  }
}
