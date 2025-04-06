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


  triggers: {},


  searches: {
     //Algod & Ledger searches
     algodGetHealth: require('./searches/algod-get-health'),
     algodGetMetrics: require('./searches/algod-get-metrics'),
     algodGetReady: require('./searches/algod-get-ready'),
     algodGetGenesis: require('./searches/algod-get-genesis'),
     algodGetStatus: require('./searches/algod-get-status'),
     algodGetStatusAfterBlock: require('./searches/algod-get-status-after-block'),
     algodGetTransactionParams: require('./searches/algod-get-transaction-params'),
     algodGetPendingTransactions: require('./searches/algod-get-pending-transactions'),
     algodGetPendingTransactionInformation: require('./searches/algod-get-pending-transaction-information'),
     algodGetVersion: require('./searches/algod-get-version'),
     algodGetLedgerSupply: require('./searches/algod-get-ledger-supply'),
     //Algorand Element searches
     algodGetAccountInformation: require('./searches/algod-get-account-information'),
     algodGetAccountApplicationInformation: require('./searches/algod-get-account-application-information'),
     algodGetAccountAssetInformation: require('./searches/algod-get-account-asset-information'),
     algodGetAccountPendingTransactions: require('./searches/algod-get-account-pending-transactions'),
     algodGetApplication: require('./searches/algod-get-application'),
     algodGetApplicationBox: require('./searches/algod-get-application-box'),
     algodGetApplicationBoxes: require('./searches/algod-get-application-boxes'),
     algodGetAsset: require('./searches/algod-get-asset'),
     //Block searches
     algodGetBlock: require('./searches/algod-get-block'),
     algodGetBlockHash: require('./searches/algod-get-block-hash'),
     algodGetLightBlockHeaderProof: require('./searches/algod-get-light-block-header-proof'),
     //Deltas searches
     algodGetLedgerStateDelta: require('./searches/algod-get-ledger-state-delta'),
     algodGetLedgerStateDeltaForTransactionGroup: require('./searches/algod-get-ledger-state-delta-for-transaction-group'),
     algodGetTransactionGroupLedgerStateDeltasForRound: require('./searches/algod-get-transaction-group-ledger-state-deltas-for-round'),
     //Proof searches
     algodGetTransactionProof: require('./searches/algod-get-transaction-proof'),
     algodGetStateProof: require('./searches/algod-get-state-proof'),
     //Participation searches
     algodGetParticipationKeys: require('./searches/algod-get-participation-keys'),
     algodGetParticipationKeyById: require('./searches/algod-get-participation-key-by-id'),
     
     //Indexer searches
     indexerGetHealth: require('./searches/indexer-get-health'),
     indexerGetAccounts: require('./searches/indexer-get-accounts'),
     indexerGetAccountById: require('./searches/indexer-get-account-by-id'),
     indexerGetAccountAppsLocalState: require('./searches/indexer-get-account-apps-local-state'),
     indexerGetAccountAssets: require('./searches/indexer-get-account-assets'),
     indexerGetAccountCreatedApplications: require('./searches/indexer-get-account-created-applications'),
     indexerGetAccountCreatedAssets: require('./searches/indexer-get-account-created-assets'),
     indexerGetAccountTransactions: require('./searches/indexer-get-account-transactions'),
     indexerGetApplications: require('./searches/indexer-get-applications'),
     indexerGetApplicationById: require('./searches/indexer-get-application-by-id'),
     indexerGetApplicationBoxByIdAndName: require('./searches/indexer-get-application-box-by-id-and-name'),
     indexerGetApplicationBoxes: require('./searches/indexer-get-application-boxes'),
     indexerGetApplicationLogs: require('./searches/indexer-get-application-logs'),
     indexerGetAssets: require('./searches/indexer-get-assets'),
     indexerGetAssetById: require('./searches/indexer-get-asset-by-id'),
     indexerGetAssetBalances: require('./searches/indexer-get-asset-balances'),
     indexerGetAssetTransactions: require('./searches/indexer-get-asset-transactions'),
     indexerGetBlock: require('./searches/indexer-get-block'),
     indexerGetTransactions: require('./searches/indexer-get-transactions'),
     indexerGetTransactionById: require('./searches/indexer-get-transaction-by-id'),

  },


  creates: {},

  resources: {},
};
