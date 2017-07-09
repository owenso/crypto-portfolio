module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": 1,
        "no-unused-vars": "warn",
        "react/jsx-uses-vars": ["error"],
        "react/jsx-curly-spacing": 1,
        "react/jsx-indent-props": [1, "tab"],
        "react/jsx-no-bind": 1,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "indent": [1, "tab", { "SwitchCase": 1 }],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ]
    },
    "globals": {
        "process": false
    }
};