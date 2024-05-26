/**
 * UTAU原音設定ファイル(oto.ini)の1行毎のレコードを扱います。
 */
export declare class OtoRecord {
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
    set dirpath(value: string);
    set filename(value: string);
    set alias(value: string);
    set offset(value: string | number);
    set overlap(value: string | number);
    set pre(value: string | number);
    set velocity(value: string | number);
    set blank(value: string | number);
    get dirpath(): string;
    get filename(): string;
    get alias(): string;
    get offset(): number;
    get overlap(): number;
    get pre(): number;
    get velocity(): number;
    get blank(): number;
}
