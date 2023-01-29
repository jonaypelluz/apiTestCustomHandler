module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        quotes: ['error', 'single'],
        curly: 'error',
        semi: 'error',
        'semi-spacing': 'error',
        'space-before-blocks': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'keyword-spacing': ['error', { before: true, after: true }],
        'comma-spacing': [2, { before: false, after: true }],
        indent: ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'react/react-in-jsx-scope': 'off'
    }
};
