const getAsset = require('../searches/algod-get-asset');
const searchAssets = require('../searches/indexer-get-assets');
const getAssetBalances = require('../searches/indexer-get-asset-balances');
const getAssetTransactions = require('../searches/indexer-get-asset-transactions');

// Define the asset resource
module.exports = {
  key: 'asset',
  noun: 'Asset',
  
  // The get method uses algodGetAsset
  get: {
    display: {
      label: 'Get Asset',
      description: 'Gets information about a specific Algorand asset by id.'
    },
    operation: {
      perform: getAsset.operation.perform,
      inputFields: getAsset.operation.inputFields,
      sample: getAsset.operation.sample
    }
  },

  // The search method uses indexerGetAssets
  search: {
    display: {
      label: 'Find Asset',
      description: 'Search for Algorand assets.'
    },
    operation: {
      perform: searchAssets.operation.perform,
      inputFields: searchAssets.operation.inputFields,
      sample: searchAssets.operation.sample
    }
  },

  // The list method combines multiple searches
  list: {
    display: {
      label: 'List Asset Details',
      description: 'Gets comprehensive information about an Algorand asset including balances and transactions.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Get basic asset info
        const assetInfo = await getAsset.operation.perform(z, bundle);
        
        // Get asset balances
        const balances = await getAssetBalances.operation.perform(z, bundle);
        
        // Get asset transactions
        const transactions = await getAssetTransactions.operation.perform(z, bundle);

        // Combine all the data
        return [{
          asset: assetInfo,
          balances: balances,
          transactions: transactions
        }];
      },
      inputFields: [
        {key: 'assetId', label: 'Asset ID', type: 'integer', required: true}
      ],
      sample: {
        asset: getAsset.operation.sample,
        balances: getAssetBalances.operation.sample,
        transactions: getAssetTransactions.operation.sample
      }
    }
  }
};
