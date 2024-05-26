import { Oto } from "../src/Oto";

describe("Otoのテスト", () => {
  test("simple_input", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\r\n_い.wav=い,6,7,8,9,10\r\n_う.wav=う,11,12,13,14,15\r\n_う.wav=* う,16,17,18,19,20"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_い.wav", "い")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_う.wav", "う")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_う.wav", "* う")).toBe(true);
    const aOto = oto.GetRecord("A3", "_あ.wav", "あ");
    if (aOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(aOto.dirpath).toBe("A3");
      expect(aOto.filename).toBe("_あ.wav");
      expect(aOto.alias).toBe("あ");
      expect(aOto.offset).toBe(1.0);
      expect(aOto.velocity).toBe(2.0);
      expect(aOto.blank).toBe(3.0);
      expect(aOto.pre).toBe(4.0);
      expect(aOto.overlap).toBe(5.0);
    }
    const iOto = oto.GetRecord("A3", "_い.wav", "い");
    if (iOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(iOto.dirpath).toBe("A3");
      expect(iOto.filename).toBe("_い.wav");
      expect(iOto.alias).toBe("い");
      expect(iOto.offset).toBe(6.0);
      expect(iOto.velocity).toBe(7.0);
      expect(iOto.blank).toBe(8.0);
      expect(iOto.pre).toBe(9.0);
      expect(iOto.overlap).toBe(10.0);
    }
    const uOto = oto.GetRecord("A3", "_う.wav", "う");
    if (uOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(uOto.dirpath).toBe("A3");
      expect(uOto.filename).toBe("_う.wav");
      expect(uOto.alias).toBe("う");
      expect(uOto.offset).toBe(11.0);
      expect(uOto.velocity).toBe(12.0);
      expect(uOto.blank).toBe(13.0);
      expect(uOto.pre).toBe(14.0);
      expect(uOto.overlap).toBe(15.0);
    }
    const u_Oto = oto.GetRecord("A3", "_う.wav", "* う");
    if (u_Oto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(u_Oto.dirpath).toBe("A3");
      expect(u_Oto.filename).toBe("_う.wav");
      expect(u_Oto.alias).toBe("* う");
      expect(u_Oto.offset).toBe(16.0);
      expect(u_Oto.velocity).toBe(17.0);
      expect(u_Oto.blank).toBe(18.0);
      expect(u_Oto.pre).toBe(19.0);
      expect(u_Oto.overlap).toBe(20.0);
    }
  });
  test("simple_input_add", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\r\n_い.wav=い,6,7,8,9,10\r\n_う.wav=う,11,12,13,14,15\r\n_う.wav=* う,16,17,18,19,20"
    );
    oto.ParseOto("B3", "_お.wav=お,21,22,23,24,25");
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_い.wav", "い")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_う.wav", "う")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_う.wav", "* う")).toBe(true);
    expect(oto.HasOtoRecord("B3", "_お.wav", "お")).toBe(true);
    const aOto = oto.GetRecord("A3", "_あ.wav", "あ");
    if (aOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(aOto.dirpath).toBe("A3");
      expect(aOto.filename).toBe("_あ.wav");
      expect(aOto.alias).toBe("あ");
      expect(aOto.offset).toBe(1.0);
      expect(aOto.velocity).toBe(2.0);
      expect(aOto.blank).toBe(3.0);
      expect(aOto.pre).toBe(4.0);
      expect(aOto.overlap).toBe(5.0);
    }
    const iOto = oto.GetRecord("A3", "_い.wav", "い");
    if (iOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(iOto.dirpath).toBe("A3");
      expect(iOto.filename).toBe("_い.wav");
      expect(iOto.alias).toBe("い");
      expect(iOto.offset).toBe(6.0);
      expect(iOto.velocity).toBe(7.0);
      expect(iOto.blank).toBe(8.0);
      expect(iOto.pre).toBe(9.0);
      expect(iOto.overlap).toBe(10.0);
    }
    const uOto = oto.GetRecord("A3", "_う.wav", "う");
    if (uOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(uOto.dirpath).toBe("A3");
      expect(uOto.filename).toBe("_う.wav");
      expect(uOto.alias).toBe("う");
      expect(uOto.offset).toBe(11.0);
      expect(uOto.velocity).toBe(12.0);
      expect(uOto.blank).toBe(13.0);
      expect(uOto.pre).toBe(14.0);
      expect(uOto.overlap).toBe(15.0);
    }
    const u_Oto = oto.GetRecord("A3", "_う.wav", "* う");
    if (u_Oto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(u_Oto.dirpath).toBe("A3");
      expect(u_Oto.filename).toBe("_う.wav");
      expect(u_Oto.alias).toBe("* う");
      expect(u_Oto.offset).toBe(16.0);
      expect(u_Oto.velocity).toBe(17.0);
      expect(u_Oto.blank).toBe(18.0);
      expect(u_Oto.pre).toBe(19.0);
      expect(u_Oto.overlap).toBe(20.0);
    }
    const oOto = oto.GetRecord("B3", "_お.wav", "お");
    if (oOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(oOto.dirpath).toBe("B3");
      expect(oOto.filename).toBe("_お.wav");
      expect(oOto.alias).toBe("お");
      expect(oOto.offset).toBe(21.0);
      expect(oOto.velocity).toBe(22.0);
      expect(oOto.blank).toBe(23.0);
      expect(oOto.pre).toBe(24.0);
      expect(oOto.overlap).toBe(25.0);
    }
  });
  test("simple_input_no_return", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_い.wav", "い")).toBe(true);
    expect(oto.HasOtoRecord("A3", "_う.wav", "う")).toBe(true);
    const aOto = oto.GetRecord("A3", "_あ.wav", "あ");
    if (aOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(aOto.dirpath).toBe("A3");
      expect(aOto.filename).toBe("_あ.wav");
      expect(aOto.alias).toBe("あ");
      expect(aOto.offset).toBe(1.0);
      expect(aOto.velocity).toBe(2.0);
      expect(aOto.blank).toBe(3.0);
      expect(aOto.pre).toBe(4.0);
      expect(aOto.overlap).toBe(5.0);
    }
    const iOto = oto.GetRecord("A3", "_い.wav", "い");
    if (iOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(iOto.dirpath).toBe("A3");
      expect(iOto.filename).toBe("_い.wav");
      expect(iOto.alias).toBe("い");
      expect(iOto.offset).toBe(6.0);
      expect(iOto.velocity).toBe(7.0);
      expect(iOto.blank).toBe(8.0);
      expect(iOto.pre).toBe(9.0);
      expect(iOto.overlap).toBe(10.0);
    }
    const uOto = oto.GetRecord("A3", "_う.wav", "う");
    if (uOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(uOto.dirpath).toBe("A3");
      expect(uOto.filename).toBe("_う.wav");
      expect(uOto.alias).toBe("う");
      expect(uOto.offset).toBe(11.0);
      expect(uOto.velocity).toBe(12.0);
      expect(uOto.blank).toBe(13.0);
      expect(uOto.pre).toBe(14.0);
      expect(uOto.overlap).toBe(15.0);
    }
  });
  test("changeParams", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    oto.SetParams("A3", "_あ.wav", "あ", 21, 22, 23, 24, 25);
    const aOto = oto.GetRecord("A3", "_あ.wav", "あ");
    if (aOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(aOto.dirpath).toBe("A3");
      expect(aOto.filename).toBe("_あ.wav");
      expect(aOto.alias).toBe("あ");
      expect(aOto.offset).toBe(21.0);
      expect(aOto.velocity).toBe(24.0);
      expect(aOto.blank).toBe(25.0);
      expect(aOto.pre).toBe(23.0);
      expect(aOto.overlap).toBe(22.0);
    }
  });
  test("addParams", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    oto.SetParams("A3", "_え.wav", "え", 21, 22, 23, 24, 25);
    const eOto = oto.GetRecord("A3", "_え.wav", "え");
    if (eOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(eOto.dirpath).toBe("A3");
      expect(eOto.filename).toBe("_え.wav");
      expect(eOto.alias).toBe("え");
      expect(eOto.offset).toBe(21.0);
      expect(eOto.velocity).toBe(24.0);
      expect(eOto.blank).toBe(25.0);
      expect(eOto.pre).toBe(23.0);
      expect(eOto.overlap).toBe(22.0);
    }
  });
  test("addParamsAll", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    oto.SetParams("B3", "_え.wav", "え", 21, 22, 23, 24, 25);
    const eOto = oto.GetRecord("B3", "_え.wav", "え");
    if (eOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(eOto.dirpath).toBe("B3");
      expect(eOto.filename).toBe("_え.wav");
      expect(eOto.alias).toBe("え");
      expect(eOto.offset).toBe(21.0);
      expect(eOto.velocity).toBe(24.0);
      expect(eOto.blank).toBe(25.0);
      expect(eOto.pre).toBe(23.0);
      expect(eOto.overlap).toBe(22.0);
    }
  });
  test("changeParamsEach", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    oto.SetOffset("A3", "_あ.wav", "あ", 21);
    oto.SetOverlap("A3", "_あ.wav", "あ", 22);
    oto.SetPre("A3", "_あ.wav", "あ", 23);
    oto.SetVelocity("A3", "_あ.wav", "あ", 24);
    oto.SetBlank("A3", "_あ.wav", "あ", 25);
    const aOto = oto.GetRecord("A3", "_あ.wav", "あ");
    if (aOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(aOto.dirpath).toBe("A3");
      expect(aOto.filename).toBe("_あ.wav");
      expect(aOto.alias).toBe("あ");
      expect(aOto.offset).toBe(21.0);
      expect(aOto.velocity).toBe(24.0);
      expect(aOto.blank).toBe(25.0);
      expect(aOto.pre).toBe(23.0);
      expect(aOto.overlap).toBe(22.0);
    }
  });
  test("changeAlias", () => {
    const oto = new Oto();
    oto.ParseOto(
      "A3",
      "_あ.wav=あ,1,2,3,4,5\n_い.wav=い,6,7,8,9,10\n_う.wav=う,11,12,13,14,15"
    );
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(true);
    oto.SetAlias("A3", "_あ.wav", "あ", "え");
    expect(oto.HasOtoRecord("A3", "_あ.wav", "あ")).toBe(false);
    expect(oto.HasOtoRecord("A3", "_あ.wav", "え")).toBe(true);
    const eOto = oto.GetRecord("A3", "_あ.wav", "え");
    if (eOto) {
      //**コンパイルの関係で1度aOtoに代入しているが、上でHasOtoRecordを実施しているため必ずtrue */
      expect(eOto.dirpath).toBe("A3");
      expect(eOto.filename).toBe("_あ.wav");
      expect(eOto.alias).toBe("え");
      expect(eOto.offset).toBe(1.0);
      expect(eOto.velocity).toBe(2.0);
      expect(eOto.blank).toBe(3.0);
      expect(eOto.pre).toBe(4.0);
      expect(eOto.overlap).toBe(5.0);
    }
  });
});
