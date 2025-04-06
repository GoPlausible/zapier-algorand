const getTransactionById = require('../searches/indexer-get-transaction-by-id');
const searchTransactions = require('../searches/indexer-get-transactions');

// Define the transaction resource
module.exports = {
  key: 'transaction',
  noun: 'Transaction',
  
  // The get method uses indexerGetTransactionById
  get: {
    display: {
      label: 'Get Transaction',
      description: 'Gets information about a specific Algorand transaction.'
    },
    operation: {
      perform: getTransactionById.operation.perform,
      inputFields: getTransactionById.operation.inputFields,
      sample: getTransactionById.operation.sample
    }
  },

  // The search method uses indexerGetTransactions
  search: {
    display: {
      label: 'Find Transaction',
      description: 'Search for Algorand transactions.'
    },
    operation: {
      perform: searchTransactions.operation.perform,
      inputFields: searchTransactions.operation.inputFields,
      sample: searchTransactions.operation.sample
    }
  },

  // The list method also uses indexerGetTransactions
  list: {
    display: {
      label: 'List Transactions',
      description: 'Gets a list of Algorand transactions.'
    },
    operation: {
      perform: searchTransactions.operation.perform,
      inputFields: searchTransactions.operation.inputFields,
      sample: searchTransactions.operation.sample
    }
  }
};
