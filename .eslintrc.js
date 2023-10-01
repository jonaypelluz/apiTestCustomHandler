module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 'error',
        curly: 'error',
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};
