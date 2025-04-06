const indexerGetAccounts = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.assetId) params['asset-id'] = bundle.inputData.assetId;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;
  if (bundle.inputData.currencyGreaterThan) params['currency-greater-than'] = bundle.inputData.currencyGreaterThan;
  if (bundle.inputData.currencyLessThan) params['currency-less-than'] = bundle.inputData.currencyLessThan;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.exclude) params.exclude = bundle.inputData.exclude;
  if (bundle.inputData.authAddr) params['auth-addr'] = bundle.inputData.authAddr;
  if (bundle.inputData.round) params.round = bundle.inputData.round;
  if (bundle.inputData.applicationId) params['application-id'] = bundle.inputData.applicationId;

  const response = await z.request(
    "http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/accounts", {
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
  key: "indexerGetAccounts",
  noun: "Accounts",
  display: {
    label: "Search Accounts",
    description: "Search for accounts based on various criteria.",
  },
  
  operation: {
    perform: indexerGetAccounts,
    inputFields: [
      {
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: false,
        helpText: 'Filter by accounts holding this asset.',
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
      },
      {
        key: 'includeAll',
        label: 'Include All',
        type: 'boolean',
        required: false,
        helpText: 'Include all items including closed accounts, deleted applications, etc.',
      },
      {
        key: 'exclude',
        label: 'Exclude',
        type: 'string',
        required: false,
        helpText: 'Exclude additional items (comma-separated): all,assets,created-assets,apps-local-state,created-apps,none',
      },
      {
        key: 'authAddr',
        label: 'Auth Address',
        type: 'string',
        required: false,
        helpText: 'Include accounts configured to use this spending key.',
      },
      {
        key: 'round',
        label: 'Round',
        type: 'integer',
        required: false,
        helpText: 'Include results for the specified round.',
      },
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: false,
        helpText: 'Filter by accounts that have opted into this application.',
      }
    ],
    sample: {
      "current-round": 0,
      "next-token": "next-token",
      "accounts": [
        {
          "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
          "amount": 0,
          "amount-without-pending-rewards": 0,
          "pending-rewards": 0,
          "rewards": 0,
          "round": 0,
          "status": "Offline",
          "total-apps-opted-in": 0,
          "total-assets-opted-in": 0,
          "total-box-bytes": 0,
          "total-boxes": 0,
          "total-created-apps": 0,
          "total-created-assets": 0
        }
      ]
    },
  },
};
