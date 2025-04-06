const indexerGetAssets = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.assetId) params['asset-id'] = bundle.inputData.assetId;
  if (bundle.inputData.creator) params.creator = bundle.inputData.creator;
  if (bundle.inputData.name) params.name = bundle.inputData.name;
  if (bundle.inputData.unit) params.unit = bundle.inputData.unit;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;

  const response = await z.request(
    "http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/assets", {
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
  key: "indexerGetAssets",
  noun: "Assets",
  display: {
    label: "Search Assets",
    description: "Search for assets with various filters.",
  },
  
  operation: {
    perform: indexerGetAssets,
    inputFields: [
      {
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: false,
        helpText: 'Filter by asset ID.',
      },
      {
        key: 'creator',
        label: 'Creator Address',
        type: 'string',
        required: false,
        helpText: 'Filter by the address that created the asset.',
      },
      {
        key: 'name',
        label: 'Asset Name',
        type: 'string',
        required: false,
        helpText: 'Filter by asset name.',
      },
      {
        key: 'unit',
        label: 'Unit Name',
        type: 'string',
        required: false,
        helpText: 'Filter by unit name.',
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
          "index": 0,
          "params": {
            "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
            "decimals": 0,
            "default-frozen": false,
            "name": "string",
            "name-b64": "string",
            "total": 0,
            "unit-name": "string",
            "unit-name-b64": "string",
            "url": "string",
            "url-b64": "string",
            "metadata-hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
          },
          "created-at-round": 0,
          "deleted": false,
          "destroyed-at-round": 0
        }
      ]
    },
  },
};
