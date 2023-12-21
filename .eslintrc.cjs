module.exports = {
   env: {
      es6: true,
      node: true,
   },
   extends: ["airbnb-base", "prettier"],
   plugins: ["prettier"],
   globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
   },
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
   },
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   rules: {
      "prettier/prettier": [
         "warn",
         {
            endOfLine: "auto",
         },
      ],
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
   },
};
