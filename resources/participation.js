const getParticipationKeyById = require('../searches/algod-get-participation-key-by-id');
const getParticipationKeys = require('../searches/algod-get-participation-keys');

// Define the participation resource
module.exports = {
  key: 'participation',
  noun: 'Participation Key',
  
  // The get method uses algodGetParticipationKeyById
  get: {
    display: {
      label: 'Get Participation Key',
      description: 'Gets information about a specific participation key.'
    },
    operation: {
      perform: getParticipationKeyById.operation.perform,
      inputFields: getParticipationKeyById.operation.inputFields,
      sample: getParticipationKeyById.operation.sample
    }
  },

  // The search method uses algodGetParticipationKeys
  search: {
    display: {
      label: 'Find Participation Keys',
      description: 'Search for participation keys.'
    },
    operation: {
      perform: getParticipationKeys.operation.perform,
      inputFields: getParticipationKeys.operation.inputFields,
      sample: getParticipationKeys.operation.sample
    }
  },

  // The list method also uses algodGetParticipationKeys
  list: {
    display: {
      label: 'List Participation Keys',
      description: 'Gets a list of participation keys.'
    },
    operation: {
      perform: getParticipationKeys.operation.perform,
      inputFields: getParticipationKeys.operation.inputFields,
      sample: getParticipationKeys.operation.sample
    }
  }
};
