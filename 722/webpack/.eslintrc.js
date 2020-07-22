//模组文件告诉eslint咋运行

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    browser: true,
  },
  //   extends: "eslint:recommended",
  rules: {
    eqeqeq: "warn",
  },
};
