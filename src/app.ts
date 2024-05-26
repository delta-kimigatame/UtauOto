import { Oto } from "./Oto";

function main() {
  const inputFile = document.getElementById("input-file");
  const resultButton = document.getElementById("result-button");
  const selectEncoding = document.getElementById(
    "select-encoding"
  ) as HTMLInputElement;
  const resultBox = document.getElementById("read-result");
  if (!inputFile) return;
  if (!resultButton) return;
  if (!resultBox) return;
  if (!selectEncoding) return;
  const oto = new Oto();
  inputFile.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    oto.InputOto("A3", target.files[0], selectEncoding.value);
    oto.InputOto("A4", target.files[0], selectEncoding.value);
  });
  resultButton.addEventListener("click", (e) => {
    resultBox.innerHTML = oto.GetJson();
    const iniFiles: Array<File> = oto.OutputOto();
    iniFiles.forEach((f) => {
      resultBox.innerHTML =
        "<a href=" +
        URL.createObjectURL(f) +
        " download=\"oto.ini\">" +
        f.name +
        "</a><br />" +
        resultBox.innerHTML;
    });
    console.log(oto.OutputOto());
  });
}

main();
