/**
 * Set target browsers to support
 */
const browsers = [
  '>1%',
  'last 4 versions',
  'last 10 Chrome versions',
  'Firefox ESR',
  'iOS 10',
  'ie >= 11',
  'not ie < 11',
  'not dead',
];

module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-preset-env')({
      browsers,
    }),
    require('postcss-reporter')({ clearReportedMessages: true }),
  ],
};
