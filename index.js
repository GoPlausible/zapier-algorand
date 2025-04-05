module.exports = {
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
    connectionLabel: '{{process.env.network}}-connection-test',
  },


  triggers: {
    algodGetHealth: require('./triggers/algod-get-health-check'),
    algodGetMetrics: require('./triggers/algod-get-metrics'),
    algodGetReady: require('./triggers/algod-get-ready'),
    algodGetGenesis: require('./triggers/algod-get-genesis'),
    algodGetAccountInformation: require('./triggers/algod-get-account-information'),
    algodGetAccountApplicationInformation: require('./triggers/algod-get-account-application-information'),
    algodGetAccountAssetInformation: require('./triggers/algod-get-account-asset-information'),
    algodGetAccountPendingTransactions: require('./triggers/algod-get-account-pending-transactions'),
    algodGetApplication: require('./triggers/algod-get-application'),
    algodGetApplicationBox: require('./triggers/algod-get-application-box'),
    algodGetApplicationBoxes: require('./triggers/algod-get-application-boxes'),
    algodGetAsset: require('./triggers/algod-get-asset'),
    algodGetBlock: require('./triggers/algod-get-block'),
    algodGetBlockHash: require('./triggers/algod-get-block-hash'),
    algodGetBlockLightHeaderProof: require('./triggers/algod-get-light-block-header-proof'),
    algodGetTransactionProof: require('./triggers/algod-get-transaction-proof'),

  },


  searches: {},


  creates: {},

  resources: {},
};
