module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin: jsx-a11y/recommended", "prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        react: { version: "detect" }
    },
    rules: {
        "react/react-in-jsx-scope": "off"
    }
};