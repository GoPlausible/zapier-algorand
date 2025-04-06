module.exports = {
  key: 'algodSimulateTransaction',
  noun: 'Transaction',
  display: {
    label: 'Simulate Transaction',
    description: 'Simulates a raw transaction or transaction group as it would be evaluated on the network'
  },
  operation: {
    perform: async (z, bundle) => {
      const { request } = bundle.inputData;
    
      // Make request to simulate transaction
      const response = await z.request({
        url: `${bundle.authData.url}/v2/transactions/simulate`,
        method: 'POST',
        headers: {
          'X-Algo-API-Token': bundle.authData.apiKey,
          'Content-Type': 'application/json'
        },
        body: request,
        skipThrowForStatus: true
      });
    
      // Handle errors
      if (response.status === 401) {
        throw new Error('Invalid API token');
      }
      if (response.status === 400) {
        const error = response.json;
        throw new Error(`Bad request: ${error.message}`);
      }
      if (response.status === 500) {
        throw new Error('Internal server error occurred');
      }
      if (response.status === 503) {
        throw new Error('Service temporarily unavailable');
      }
      if (response.status !== 200) {
        throw new Error(`Unexpected error: ${response.status}`);
      }
    
      // Return successful response
      return response.json;
    },
    inputFields: [
      {
        key: 'request',
        label: 'Simulation Request',
        type: 'string',
        required: true,
        helpText: 'JSON string containing the simulation request data including transactions and other inputs'
      }
    ],
    sample: {
      'last-round': 1000,
      'txn-groups': [
        {
          'app-budget-added': 700,
          'app-budget-consumed': 100,
          'txn-results': [
            {
              'app-budget-consumed': 100,
              'txn-result': {
                'confirmed-round': 1000,
                'pool-error': '',
                'txn': {}
              }
            }
          ]
        }
      ],
      version: 1
    },
    outputFields: [
      {
        key: 'last-round',
        label: 'Last Round',
        type: 'integer'
      },
      {
        key: 'txn-groups',
        label: 'Transaction Group Results',
        type: 'string',
        helpText: 'JSON array of transaction group simulation results'
      },
      {
        key: 'version',
        label: 'Version',
        type: 'integer'
      },
      {
        key: 'eval-overrides',
        label: 'Evaluation Overrides',
        type: 'string',
        helpText: 'JSON object containing evaluation parameter overrides'
      }
    ]
  }
};
