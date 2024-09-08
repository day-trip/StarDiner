import path from 'path'
import { fileURLToPath } from 'url'

import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})
const config = [...compat.extends('next/core-web-vitals', 'next/typescript')]
export default config
