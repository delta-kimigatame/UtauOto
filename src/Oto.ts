/**
 * UTAU原音設定ファイルを扱います。
 */

import { OtoRecord } from "./OtoRecord";

export class Oto {
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
      console.log(line);
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
      if (this.datas[dirPath]&&this.datas[dirPath][filename]) {
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

  GetJson(): string {
    return JSON.stringify(this.datas);
  }
}
