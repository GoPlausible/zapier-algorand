const indexerGetAssetById = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/assets/${bundle.inputData.assetId}`, {
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
  key: "indexerGetAssetById",
  noun: "Asset",
  display: {
    label: "Get Asset Information",
    description: "Lookup asset information by asset ID.",
  },
  
  operation: {
    perform: indexerGetAssetById,
    inputFields: [
      {
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: true,
        helpText: 'The asset ID to look up.',
      },
      {
        key: 'includeAll',
        label: 'Include All',
        type: 'boolean',
        required: false,
        helpText: 'Include all items including closed accounts, deleted applications, etc.',
      }
    ],
    sample: {
      "current-round": 0,
      "asset": {
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
    },
  },
};
