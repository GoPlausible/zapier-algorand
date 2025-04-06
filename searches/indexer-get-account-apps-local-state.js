const indexerGetAccountAppsLocalState = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.applicationId) params['application-id'] = bundle.inputData.applicationId;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/accounts/${bundle.inputData.accountId}/apps-local-state`, {
      method: "GET",
      params: params,
      headers: {
        'X-Algo-API-Token': '{{process.env.TOKEN}}',
      },
    }
  );
  return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
};

module.exports = {
  key: "indexerGetAccountAppsLocalState",
  noun: "Account Apps Local State",
  display: {
    label: "Get Account Application Local States",
    description: "Lookup an account's application local states, optionally filtered by application ID.",
  },
  
  operation: {
    perform: indexerGetAccountAppsLocalState,
    inputFields: [
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'string',
        required: true,
        helpText: 'The account address to look up application states for.',
      },
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: false,
        helpText: 'Filter results for specific application ID.',
      },
      {
        key: 'includeAll',
        label: 'Include All',
        type: 'boolean',
        required: false,
        helpText: 'Include all items including closed accounts, deleted applications, etc.',
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of results to return.',
      },
      {
        key: 'next',
        label: 'Next Page Token',
        type: 'string',
        required: false,
        helpText: 'Token for requesting the next page of results.',
      }
    ],
    sample: {
      "current-round": 0,
      "next-token": "next-token",
      "apps-local-states": [
        {
          "id": 0,
          "schema": {
            "num-byte-slice": 0,
            "num-uint": 0
          },
          "key-value": [
            {
              "key": "key",
              "value": {
                "bytes": "value",
                "type": 1,
                "uint": 0
              }
            }
          ],
          "deleted": false,
          "opted-in-at-round": 0,
          "closed-out-at-round": 0
        }
      ]
    },
  },
};
