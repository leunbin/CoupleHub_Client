import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default {
  languageOptions: {
    globals: {
      ...globals.browser,
      kakao: 'readonly',
      window: 'readonly',
    },
  },
  plugins: {
    react: pluginReact,
  },
  rules: {
    'react/function-component-definition': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'no-var': 'warn',
    eqeqeq: 'warn',
    'no-extra-semi': 'error',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
    },
  ],
  extends: [
    pluginJs.configs.recommended,
    pluginReact.configs.recommended,
  ],
};
