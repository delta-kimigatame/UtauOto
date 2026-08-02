import * as iconv from "iconv-lite";
import { afterEach, describe, expect, test, vi } from "vitest";
import Oto from "../src/Oto";

class TestFile extends Blob {
  readonly name: string;

  constructor(bits: BlobPart[], name: string, options?: FilePropertyBag) {
    super(bits, options);
    this.name = name;
  }
}

describe("Windows-31j 出力の統合テスト", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("iconv-lite が Windows-31j の別名を解決できる", () => {
    expect(iconv.encodingExists("Windows-31j")).toBe(true);
    expect(Array.from(iconv.encode("あ", "Windows-31j"))).toEqual([0x82, 0xa0]);
  });

  test("Oto.OutputOto は Windows-31j の oto.ini を出力する", async () => {
    vi.stubGlobal("File", TestFile);
    const oto = new Oto();
    const line = "あ.wav=あ,1.000,2.000,3.000,4.000,5.000";
    oto.ParseOto("oto.ini", line);

    const [output] = oto.OutputOto();
    const bytes = new Uint8Array(await output.arrayBuffer());

    expect(Array.from(bytes)).toEqual(
      Array.from(iconv.encode(line, "Windows-31j"))
    );
    expect(iconv.decode(bytes, "Windows-31j")).toBe(line);
  });
});