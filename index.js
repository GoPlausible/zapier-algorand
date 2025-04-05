module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
   authentication : {
    type: 'custom',

    test: {
      url: 'https://testnet-api.algonode.cloud/health',
      method: 'GET',
      headers: {
        'X-Algo-API-Token': '{{bundle.authData.token}}',
      },
    },
    connectionLabel: '{{process.env.network}}-test',
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    algodGetHealth: require('./triggers/algod-get-health-check'),
    algodGetGenesis: require('./triggers/algod-get-genesis'),
    algodGetAccountInformation: require('./triggers/algod-get-account-information'),
    algodGetAccountApplicationInformation: require('./triggers/algod-get-account-application-information'),
    algodGetAccountAssetInformation: require('./triggers/algod-get-account-asset-information'),
    algodGetAccountPendingTransactions: require('./triggers/algod-get-account-pending-transactions'),
    algodGetApplication: require('./triggers/algod-get-application'),
    algodGetApplicationBoxes: require('./triggers/algod-get-application-boxes'),
    algodGetMetrics: require('./triggers/algod-get-metrics'),
    algodGetReady: require('./triggers/algod-get-ready'),
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
};
