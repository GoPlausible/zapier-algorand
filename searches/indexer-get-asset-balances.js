const indexerGetAssetBalances = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;
  if (bundle.inputData.currencyGreaterThan) params['currency-greater-than'] = bundle.inputData.currencyGreaterThan;
  if (bundle.inputData.currencyLessThan) params['currency-less-than'] = bundle.inputData.currencyLessThan;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/assets/${bundle.inputData.assetId}/balances`, {
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
  key: "indexerGetAssetBalances",
  noun: "Asset Balances",
  display: {
    label: "Get Asset Balances",
    description: "Get accounts that hold a specific asset.",
  },
  
  operation: {
    perform: indexerGetAssetBalances,
    inputFields: [
      {
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: true,
        helpText: 'The asset ID to look up balances for.',
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
      },
      {
        key: 'currencyGreaterThan',
        label: 'Balance Greater Than',
        type: 'integer',
        required: false,
        helpText: 'Results should have an amount greater than this value.',
      },
      {
        key: 'currencyLessThan',
        label: 'Balance Less Than',
        type: 'integer',
        required: false,
        helpText: 'Results should have an amount less than this value.',
      }
    ],
    sample: {
      "current-round": 0,
      "next-token": "next-token",
      "balances": [
        {
          "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
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
