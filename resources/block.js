const getBlock = require('../searches/algod-get-block');
const searchTransactions = require('../searches/indexer-get-transactions');

// Define the block resource
module.exports = {
  key: 'block',
  noun: 'Block',
  
  // The get method uses algodGetBlock
  get: {
    display: {
      label: 'Get Block',
      description: 'Gets information about a specific Algorand block.'
    },
    operation: {
      perform: getBlock.operation.perform,
      inputFields: getBlock.operation.inputFields,
      sample: getBlock.operation.sample
    }
  },

  // The search method uses indexerGetTransactions filtered by round
  search: {
    display: {
      label: 'Find Block Transactions',
      description: 'Search for transactions in a specific Algorand block.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Add the round parameter to filter transactions by block
        bundle.inputData.round = bundle.inputData.roundNumber;
        return await searchTransactions.operation.perform(z, bundle);
      },
      inputFields: [
        {key: 'roundNumber', label: 'Block Round', type: 'integer', required: true},
        ...searchTransactions.operation.inputFields.filter(field => field.key !== 'round')
      ],
      sample: searchTransactions.operation.sample
    }
  },

  // The list method also uses indexerGetTransactions filtered by round
  list: {
    display: {
      label: 'List Block Transactions',
      description: 'Gets a list of transactions in a specific Algorand block.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Add the round parameter to filter transactions by block
        bundle.inputData.round = bundle.inputData.roundNumber;
        return await searchTransactions.operation.perform(z, bundle);
      },
      inputFields: [
        {key: 'roundNumber', label: 'Block Round', type: 'integer', required: true},
        ...searchTransactions.operation.inputFields.filter(field => field.key !== 'round')
      ],
      sample: searchTransactions.operation.sample
    }
  }
};
