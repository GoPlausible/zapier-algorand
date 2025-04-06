const indexerGetAccountAssets = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.assetId) params['asset-id'] = bundle.inputData.assetId;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/accounts/${bundle.inputData.accountId}/assets`, {
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
  key: "indexerGetAccountAssets",
  noun: "Account Assets",
  display: {
    label: "Get Account Asset Holdings",
    description: "Lookup an account's asset holdings, optionally filtered by asset ID.",
  },
  
  operation: {
    perform: indexerGetAccountAssets,
    inputFields: [
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'string',
        required: true,
        helpText: 'The account address to look up asset holdings for.',
      },
      {
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: false,
        helpText: 'Filter results for specific asset ID.',
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
      "assets": [
        {
          "asset-id": 0,
          "amount": 0,
          "is-frozen": false,
          "deleted": false,
          "opted-in-at-round": 0,
          "opted-out-at-round": 0
        }
      ]
    },
  },
};
