const perform = async (z, bundle) => {
  const { request } = bundle.inputData;

  // Make request to dryrun TEAL
  const response = await z.request({
    url: `${bundle.authData.url}/v2/teal/dryrun`,
    method: 'POST',
    headers: {
      'X-Algo-API-Token': bundle.authData.apiKey,
      'Content-Type': 'application/json'
    },
    body: request,
    skipThrowForStatus: true
  });

  // Handle errors
  if (response.status === 404) {
    throw new Error('Developer API not enabled on the node');
  }
  if (response.status === 401) {
    throw new Error('Invalid API token');
  }
  if (response.status === 400) {
    const error = response.json;
    throw new Error(`TEAL dryrun failed: ${error.message}`);
  }
  if (response.status === 500) {
    throw new Error('Internal server error occurred');
  }
  if (response.status !== 200) {
    throw new Error(`Unexpected error: ${response.status}`);
  }

  // Return successful response
  return response.json;
};

module.exports = {
  key: 'algod_dryrun_teal',
  noun: 'TEAL Program',
  display: {
    label: 'Dryrun TEAL Program',
    description: 'Executes TEAL program(s) in context and returns debugging information'
  },
  operation: {
    inputFields: [
      {
        key: 'request',
        label: 'Dryrun Request',
        type: 'string',
        required: true,
        helpText: 'JSON string containing the dryrun request data including transactions and simulation state'
      }
    ],
    sample: {
      error: '',
      'protocol-version': 'future',
      txns: [
        {
          'app-call-messages': ['PASS'],
          'app-call-trace': [
            {
              'line': 1,
              'pc': 1,
              'stack': []
            }
          ],
          'disassembly': ['#pragma version 6', 'int 1', 'return'],
          'global-delta': [],
          'local-deltas': [],
          'logs': []
        }
      ]
    },
    outputFields: [
      {
        key: 'error',
        label: 'Error',
        type: 'string'
      },
      {
        key: 'protocol-version',
        label: 'Protocol Version',
        type: 'string'
      },
      {
        key: 'txns',
        label: 'Transaction Results',
        type: 'array'
      }
    ]
  }
};
