const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        tsConfigPath: './jsconfig.json', // or jsconfig.json
      },
    },
  ],
};
