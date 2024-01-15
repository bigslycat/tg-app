import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/web-client.ts', 'src/node-client.ts'],
  outDir: 'lib',
  clean: true,
  splitting: false,
  sourcemap: true,
  cjsInterop: true,
  format: ['cjs', 'esm'],
  dts: true,
})
