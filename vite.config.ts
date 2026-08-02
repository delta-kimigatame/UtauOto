/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  test: {
    globals: true, // Jestの `global` な関数 (`describe`, `test` など) を有効にする
    environment: "node",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "utauoto",
      fileName: (format) => `utauoto.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      // iconv-lite は CommonJS の遅延 require で文字コード表を読み込む。
      // 同梱すると消費側ブラウザビルドで表が欠落する場合があるため、外部依存として残す。
      external: ["iconv-lite"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});