const indexerGetAccountById = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.round) params.round = bundle.inputData.round;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.exclude) params.exclude = bundle.inputData.exclude;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/accounts/${bundle.inputData.accountId}`, {
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
  key: "indexerGetAccountById",
  noun: "Account",
  display: {
    label: "Get Account Information",
    description: "Lookup account information by account ID.",
  },
  
  operation: {
    perform: indexerGetAccountById,
    inputFields: [
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'string',
        required: true,
        helpText: 'The account address to look up.',
      },
      {
        key: 'round',
        label: 'Round',
        type: 'integer',
        required: false,
        helpText: 'Include results for the specified round.',
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
      }
    ],
    sample: {
      "current-round": 0,
      "account": {
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
    },
  },
};
