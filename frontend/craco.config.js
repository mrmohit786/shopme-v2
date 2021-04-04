/* eslint-disable import/no-extraneous-dependencies */
const CracoAlias = require('craco-alias');

module.exports = {
  plugin: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src',
        tsConfigPath: './jsconfig.paths.json',
      },
    },
  ],
};
