module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
        'jest': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "eqeqeq": "error",
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        "no-console": 0,
        "no-trailing-spaces": "error",
        "no-unused-vars": [
            "error", {
                "args-ignore-pattern": "^_"
            }
        ]
        "object-curly-spacing": [
            "error", "never"
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};