import { mkdirSync, readFileSync, rmSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { buildSchema } from 'graphql'
import { getDocumentNodeFromSchema } from '@graphql-tools/utils'

const root = resolve(__dirname, '..')
const sourcePath = resolve(root, '../service/Schema.gql')
const libPath = resolve(root, './lib')
const cjsPath = resolve(libPath, './schema.cjs')
const mjsPath = resolve(libPath, './schema.mjs')

const sourceRaw = readFileSync(sourcePath, 'utf-8')
const source = buildSchema(sourceRaw, { noLocation: true })

const data = JSON.stringify(getDocumentNodeFromSchema(source))
  .replaceAll(/"([a-z]+)":/gi, '$1:')
  .replaceAll(/(?:,[a-z]+:\[\]|[a-z]+:\[\],)/gi, '')

rmSync(libPath, { force: true, recursive: true })
mkdirSync(libPath)

const cjs = `module.exports.Schema = ${data};`
const mjs = `export const Schema = ${data};`

Promise.all([
  writeFile(cjsPath, cjs, 'utf-8'),
  writeFile(mjsPath, mjs, 'utf-8'),
]).catch(error => {
  console.error(error)
  process.exit(1)
})
