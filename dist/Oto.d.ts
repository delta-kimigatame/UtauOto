/**
 * UTAU原音設定ファイルを扱います。
 */
import OtoRecord from "./OtoRecord";
export default class Oto {
    private datas;
    private records;
    constructor();
    /**
     * oto.iniに含まれるエイリアス数を返す。
     * この操作は、ParseOtoを使ってoto.iniファイルを読み込んだ際には正常に動作するが、
     * SetAlias や SetParams、RemoveFileName、RemoveAlias などの編集操作を行うと正常に動作しないため注意が必要である。
     * ToDo:SetAlias、SetParams、RemoveFileName、RemoveAliasの修正
     */
    get otoCount(): number;
    /**
     * oto.iniのデータを分割し、datasとaliasに格納する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param data oto.iniのデータ
     */
    ParseOto(dirPath: string, data: string): void;
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
    SetParams(dirPath: string, filename: string, alias: string, offset: number, overlap: number, pre: number, velocity: number, blank: number): void;
    /**
     * エイリアスを変更する。
     * 元のエイリアスが存在しない場合、空のOtoRecordを作成する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param newAlias 新しいエイリアス
     */
    SetAlias(dirPath: string, filename: string, alias: string, newAlias: string): void;
    /**
     * オフセット値を変更する。
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param offset オフセット(左ブランク)
     */
    SetOffset(dirPath: string, filename: string, alias: string, offset: number): void;
    /**
     * オフセット値を変更する。
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param overlap オーバーラップ
     */
    SetOverlap(dirPath: string, filename: string, alias: string, overlap: number): void;
    /**
     * 先行発声値を変更する。
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param pre 先行発声
     */
    SetPre(dirPath: string, filename: string, alias: string, pre: number): void;
    /**
     * 子音部値を変更する。
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param pre 子音部(固定範囲)
     */
    SetVelocity(dirPath: string, filename: string, alias: string, velocity: number): void;
    /**
     * ブランク値を変更する。
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @param pre ブランク(右ブランク)
     */
    SetBlank(dirPath: string, filename: string, alias: string, blank: number): void;
    /**
     * エイリアスの有無を確認する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @returns this.datas[dirPath][filename][alias]が存在すればtrue、しなければfalse
     */
    HasOtoRecord(dirPath: string, filename: string, alias: string): boolean;
    /**
     * 元のエイリアスが存在しない場合、コンソールにエラーを出力する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     */
    OutputHasNotKeyLog(dirPath: string, filename: string, alias: string): void;
    /**
     * 指定したOtoのレコードを返す。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 現在のエイリアス
     * @returns this.datas[dirPath][filename][alias]
     */
    GetRecord(dirPath: string, filename: string, alias: string): OtoRecord | null;
    /**
     * エイリアスに該当するoto.iniのレコードを返す
     * @param alias
     * @returns
     */
    GetRecordFromAlias(alias: string): OtoRecord | null;
    /**
     * oto.iniを読み込んでdatasに格納する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param otoPath oto.iniのファイルパス
     * @param encoding 読み込むotoの文字コード、標準はSJIS
     */
    InputOto(dirPath: string, oto: Blob, encoding?: string): void;
    /**
     * oto.iniを読み込んでdatasに格納する(async/await対応)
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param otoPath oto.iniのファイルパス
     * @param encoding 読み込むotoの文字コード、標準はSJIS
     */
    InputOtoAsync(dirPath: string, oto: Blob, encoding?: string): Promise<void>;
    /**
     * OtoのデータをFileオブジェクトに出力する。
     * 別途URL.createObjectURLを使用して、ダウンロードすることを想定
     * @param encoding 読み込むotoの文字コード、標準はSJIS
     * @returns dirPath毎のoto.iniのFileオブジェクト
     */
    OutputOto(encoding?: string): Array<File>;
    GetJson(): string;
    /**
     * oto.iniの一覧を文字列で返す
     * @returns oto.iniの一覧
     */
    GetLines(): {
        [key: string]: Array<string>;
    };
    /**
     * サブディレクトリとファイル名を指定して、指定したファイル名のレコードをすべて削除する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename 削除するwavファイルのoto.iniからの相対パス
     */
    RemoveFileName(dirPath: string, filename: string): void;
    /**
     * サブディレクトリとファイル名とエイリアスを指定して、指定したレコードを削除する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @param alias 削除するエイリアス
     */
    RemoveAlias(dirPath: string, filename: string, alias: string): void;
    /**
     * サブディレクトリを指定してファイル名一覧を取得する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @returns oto.iniからwavファイルまでの相対パスの一覧
     */
    GetFileNames(dirPath: string): Array<string>;
    /**
     * サブディレクトリとファイル名を指定してエイリアスの一覧を取得する。
     * @param dirPath 原音ルートからoto.iniがあるディレクトリまでの相対パス
     * @param filename oto.iniからwavファイルまでの相対パス
     * @returns 指定したファイルのエイリアスの一覧
     */
    GetAliases(dirPath: string, filename: string): Array<string>;
}
