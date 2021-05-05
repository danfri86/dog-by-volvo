module.exports = {
  parser: '@typescript-eslint/parser',
  // Make sure eslint picks up the config at the root of the directory
  root: true,
  parserOptions: {
    // Use the latest ecmascript standard
    ecmaVersion: 2020,
    // Allows using import/export statements
    sourceType: 'module',
    ecmaFeatures: {
      // Enable JSX since we're using React
      jsx: true
    }
  },
  settings: {
    react: {
      // Automatically detect the react version
      version: 'detect'
    }
  },
  env: {
    // Enables browser globals like window and document
    browser: true,
    // Enables require() and define() as global variables as per the amd spec.
    amd: true,
    // Enables Node.js global variables and Node.js scoping.
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    // Make this the last element so prettier config overrides other formatting rules
    'plugin:prettier/recommended'
  ],
  plugins: ['simple-import-sort', 'import'],
  rules: {
    // Use our .prettierrc file as source
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],

    // Skip the need to import react. Not needed with NextJS
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Remove rules for these for simple-import-sort to work correct
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error'
  }
};
