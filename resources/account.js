const getAccountInfo = require('../searches/algod-get-account-information');
const searchAccounts = require('../searches/indexer-get-accounts');
const getAccountAppsLocalState = require('../searches/indexer-get-account-apps-local-state');
const getAccountAssets = require('../searches/indexer-get-account-assets');
const getAccountCreatedApps = require('../searches/indexer-get-account-created-applications');
const getAccountCreatedAssets = require('../searches/indexer-get-account-created-assets');
const getAccountPendingTxns = require('../searches/algod-get-account-pending-transactions');
const getAccountTxns = require('../searches/indexer-get-account-transactions');

// Define the account resource
module.exports = {
  key: 'account',
  noun: 'Account',
  
  // The get method uses algodGetAccountInformation
  get: {
    display: {
      label: 'Get Account',
      description: 'Gets information about a specific Algorand account.'
    },
    operation: {
      perform: getAccountInfo.operation.perform,
      inputFields: getAccountInfo.operation.inputFields,
      sample: getAccountInfo.operation.sample
    }
  },

  // The search method uses indexerGetAccounts
  search: {
    display: {
      label: 'Find Accounts',
      description: 'Search for Algorand accounts.'
    },
    operation: {
      perform: searchAccounts.operation.perform,
      inputFields: searchAccounts.operation.inputFields,
      sample: searchAccounts.operation.sample
    }
  },

  // The list method combines multiple searches
  list: {
    display: {
      label: 'List Account Details',
      description: 'Gets comprehensive information about an Algorand account including apps, assets, and transactions.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Get basic account info
        const accountInfo = await getAccountInfo.operation.perform(z, bundle);
        
        // Get apps local state
        const appsLocalState = await getAccountAppsLocalState.operation.perform(z, bundle);
        
        // Get account assets
        const assets = await getAccountAssets.operation.perform(z, bundle);
        
        // Get created apps
        const createdApps = await getAccountCreatedApps.operation.perform(z, bundle);
        
        // Get created assets
        const createdAssets = await getAccountCreatedAssets.operation.perform(z, bundle);
        
        // Get pending transactions
        const pendingTxns = await getAccountPendingTxns.operation.perform(z, bundle);
        
        // Get transaction history
        const transactions = await getAccountTxns.operation.perform(z, bundle);

        // Combine all the data
        return [{
          account: accountInfo,
          appsLocalState: appsLocalState,
          assets: assets,
          createdApplications: createdApps,
          createdAssets: createdAssets,
          pendingTransactions: pendingTxns,
          transactions: transactions
        }];
      },
      inputFields: [
        {key: 'accountId', label: 'Account Address', type: 'string', required: true}
      ],
      sample: {
        account: getAccountInfo.operation.sample,
        appsLocalState: getAccountAppsLocalState.operation.sample,
        assets: getAccountAssets.operation.sample,
        createdApplications: getAccountCreatedApps.operation.sample,
        createdAssets: getAccountCreatedAssets.operation.sample,
        pendingTransactions: getAccountPendingTxns.operation.sample,
        transactions: getAccountTxns.operation.sample
      }
    }
  }
};
