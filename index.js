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
    //Algod triggers
    algodGetHealth: require('./triggers/algod-get-health-check'),
    algodGetMetrics: require('./triggers/algod-get-metrics'),
    algodGetReady: require('./triggers/algod-get-ready'),
    algodGetGenesis: require('./triggers/algod-get-genesis'),
    //Algorand Element triggers
    algodGetAccountInformation: require('./triggers/algod-get-account-information'),
    algodGetAccountApplicationInformation: require('./triggers/algod-get-account-application-information'),
    algodGetAccountAssetInformation: require('./triggers/algod-get-account-asset-information'),
    algodGetAccountPendingTransactions: require('./triggers/algod-get-account-pending-transactions'),
    algodGetApplication: require('./triggers/algod-get-application'),
    algodGetApplicationBox: require('./triggers/algod-get-application-box'),
    algodGetApplicationBoxes: require('./triggers/algod-get-application-boxes'),
    algodGetAsset: require('./triggers/algod-get-asset'),
    //Block triggers
    algodGetBlock: require('./triggers/algod-get-block'),
    algodGetBlockHash: require('./triggers/algod-get-block-hash'),
    algodGetLightBlockHeaderProof: require('./triggers/algod-get-light-block-header-proof'),
    //Deltas triggers
    algodGetLedgerStateDelta: require('./triggers/algod-get-ledger-state-delta'),
    algodGetLedgerStateDeltaForTransactionGroup: require('./triggers/algod-get-ledger-state-delta-for-transaction-group'),
    algodGetTransactionGroupLedgerStateDeltasForRound: require('./triggers/algod-get-transaction-group-ledger-state-deltas-for-round'),
    //Dev Mode triggers
    algodGetBlockTimeStampOffset: require('./triggers/algod-get-block-timestamp-offset'),

    //Participation triggers
    algodGetParticipationKeys: require('./triggers/algod-get-participation-keys'),
    algodGetParticipationKeyById: require('./triggers/algod-get-participation-key-by-id'),
    algodGetStateProof: require('./triggers/algod-get-state-proof'),
  },


  searches: {},


  creates: {},

  resources: {},
};
