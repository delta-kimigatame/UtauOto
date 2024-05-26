import OtoRecord from "../src/OtoRecord";

describe("OtoRecordのテスト", () => {
  test("default_init", () => {
    const oto = new OtoRecord("", "=,,,,,");
    expect(oto.dirpath).toBe("");
    expect(oto.filename).toBe("");
    expect(oto.alias).toBe("");
    expect(oto.offset).toBe(0.0);
    expect(oto.overlap).toBe(0.0);
    expect(oto.pre).toBe(0.0);
    expect(oto.velocity).toBe(0.0);
    expect(oto.blank).toBe(0.0);
  });
  test("read_param_init", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });

  test("setOffset", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.offset = 1.1;
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.1);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setOffsetString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.offset = "1.1";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.1);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setOffsetErrorString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.offset = "あ";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });

  test("setOverlap", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.overlap = 1.1;
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(1.1);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setOverlapString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.overlap = "1.1";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(1.1);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setOverlapErrorString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.overlap = "あ";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(0.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });

  test("setPre", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.pre = 1.1;
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(1.1);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setPreString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.pre = "1.1";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(1.1);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setPreErrorString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.pre = "あ";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(3.0);
  });

  test("setVelocity", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.velocity = 1.1;
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(1.1);
    expect(oto.blank).toBe(3.0);
  });
  test("setVelocityString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.velocity = "1.1";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(1.1);
    expect(oto.blank).toBe(3.0);
  });
  test("setVelocityErrorString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.velocity = "あ";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(0.0);
    expect(oto.blank).toBe(3.0);
  });
  test("setBlank", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.blank = 1.1;
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(1.1);
  });
  test("setBlankString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.blank = "1.1";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(1.1);
  });
  test("setBlankErrorString", () => {
    const oto = new OtoRecord("B3", "あ.wav=あ,1.0,2.0,3.0,4.0,5.0");
    oto.blank = "あ";
    expect(oto.dirpath).toBe("B3");
    expect(oto.filename).toBe("あ.wav");
    expect(oto.alias).toBe("あ");
    expect(oto.offset).toBe(1.0);
    expect(oto.overlap).toBe(5.0);
    expect(oto.pre).toBe(4.0);
    expect(oto.velocity).toBe(2.0);
    expect(oto.blank).toBe(0.0);
  });
});
