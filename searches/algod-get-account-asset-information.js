const { v4: uuidv4 } = require('uuid');

const algodGetAccountAssetInformation = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/accounts/{{bundle.inputData.address}}/assets/{{bundle.inputData.assetId}}", {
        method: "GET",
        params: {
          format: "{{bundle.inputData.format}}"
        },
        headers: {
          'X-Algo-API-Token': '{{process.env.TOKEN}}',
        },
      }
    );
    if(response.data)response.data.id = uuidv4();
    return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
  };
  
  module.exports = {
    key: "algodGetAccountAssetInformation",
    noun: "Get Account Asset Information",
    display: {
      label: "Get account information about a given asset",
      description: "Given a specific account public key and asset ID, this call returns the account's asset holding and asset parameters (if either exist). Asset parameters will only be returned if the provided address is the asset's creator.",
    },
    operation: {
      inputFields: [
        {
          key: 'address',
          label: 'Account Address',
          type: 'string',
          required: true,
          helpText: 'An account public key in standard Algorand format (58 characters)',
        },
        {
          key: 'assetId',
          label: 'Asset ID',
          type: 'integer',
          required: true,
          helpText: 'The asset identifier',
        },
        {
          key: 'format',
          label: 'Response Format',
          type: 'string',
          choices: ['json', 'msgpack'],
          required: false,
          default: 'json',
          helpText: 'Configures whether the response object is JSON or MessagePack encoded. Defaults to JSON.',
        }
      ],
      perform: algodGetAccountAssetInformation,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "round": 12345,
        "asset-holding": {
          "amount": 1000000,
          "asset-id": 12345,
          "is-frozen": false
        },
        "created-asset": {
          "index": 12345,
          "params": {
            "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "decimals": 0,
            "total": 1000000,
            "defaultFrozen": false,
            "unitName": "UNIT",
            "assetName": "Test Asset"
          }
        }
      },
    },
  };
