import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  splitting: false,
  sourcemap: true,
  cjsInterop: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
})
