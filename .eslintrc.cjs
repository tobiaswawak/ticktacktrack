module.exports = {
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended"
  ],
  rules: {
    quotes: ["error", "double"],
    "vue/multi-word-component-names": "off",
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true
      }
    ],
    "vue/no-use-v-if-with-v-for": "warn"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@babel/eslint-parser",
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"]
      }
    }
  }
};
