import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/telegram.ts', 'src/global.ts'],
  outDir: 'lib',
  sourcemap: true,
  cjsInterop: true,
  format: ['cjs', 'esm'],
  dts: true,
})
