module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react/prop-types': 'off',
    // Using the new JSX transform - React import not required in scope
    'react/react-in-jsx-scope': 'off',
    // Prevent noisy failures on apostrophes in text content
    'react/no-unescaped-entities': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Keep as a warning; prefer future cleanup over blocking CI
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  overrides: [
    {
      files: ['src/components/3d/**/*.jsx'],
      rules: {
        // R3F uses custom JSX elements/props that trip this rule
        'react/no-unknown-property': 'off',
      },
    },
  ],
}
