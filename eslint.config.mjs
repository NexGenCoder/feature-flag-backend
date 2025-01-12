import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
   {
      files: ['**/*.{js,mjs,cjs,ts}'],
      rules: {
         'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
      languageOptions: {
         globals: {
            ...globals.node,
         },
      },
   },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
]
