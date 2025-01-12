import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
   {
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
         globals: {
            ...globals.node,
            ...globals.jest,
         },
      },
      plugins: {
         '@typescript-eslint': tsPlugin,
      },
      files: ['**/*.ts'],
      rules: {
         // TypeScript specific rules
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/explicit-function-return-type': 'warn',
         '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
         ],

         // General rules
         'no-console': ['warn', { allow: ['warn', 'error'] }],
         'no-debugger': 'warn',
         'no-duplicate-imports': 'error',
         'no-unused-vars': 'off', // Turned off in favor of @typescript-eslint/no-unused-vars
         semi: ['error', 'always'],
         quotes: ['error', 'single'],
         indent: ['error', 3],
      },
   },
]
