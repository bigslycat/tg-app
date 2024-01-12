import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'lib',
  entry: ['src/schema.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  bundle: true,
  format: ['cjs', 'esm'],
})
