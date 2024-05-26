/**
 * UTAU原音設定ファイル(oto.ini)の1行毎のレコードを扱います。
 */
export default class OtoRecord {
    private dirpath_;
    private record;
    private _dirpath;
    private _filename;
    private _alias;
    private _offset;
    private _overlap;
    private _pre;
    private _velocity;
    private _blank;
    /**
     * @param dirpath_ 原音ルートからの相対パス
     * @param record oto.ini 1行分相当のテキストデータ {filename}={alias},{offset},{velocity},{blank},{pre},{overlap}
     */
    constructor(dirpath_: string, record: string);
    /**
     * 原音ルートからの相対パス
     */
    set dirpath(value: string);
    /**ファイル名*/
    set filename(value: string);
    /**エイリアス */
    set alias(value: string);
    /** オフセット(左ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
    set offset(value: string | number);
    /** オーバーラップ。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
    set overlap(value: string | number);
    /** 先行発声。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
    set pre(value: string | number);
    /** 子音部(固定範囲)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
    set velocity(value: string | number);
    /** ブランク(右ブランク)。非数値の文字が与えられた場合、consoleにエラーを出力して0とする*/
    set blank(value: string | number);
    /**原音ルートからの相対パス */
    get dirpath(): string;
    /**ファイル名 */
    get filename(): string;
    /**エイリアス */
    get alias(): string;
    /**オフセット(左ブランク) */
    get offset(): number;
    /**オーバーラップ */
    get overlap(): number;
    /**先行発声 */
    get pre(): number;
    /**子音部(固定範囲) */
    get velocity(): number;
    /**ブランク(右ブランク) */
    get blank(): number;
}
