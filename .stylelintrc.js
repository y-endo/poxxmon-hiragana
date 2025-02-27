export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier-scss',
  ],
  ignoreFiles: [
    '**/node_modules/**',
    'src/scss/jp/n5-common/css/_before_common_202204/_common.scss',
  ],
  rules: {},
};
