const { v4: uuidv4 } = require('uuid');

const algodGetAsset = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/assets/{{bundle.inputData.assetId}}", {
        method: "GET",
        headers: {
          'X-Algo-API-Token': '{{process.env.TOKEN}}',
        },
      }
    );
    if(response.data)response.data.id = uuidv4();
    return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
  };
  
  module.exports = {
    key: "algodGetAsset",
    noun: "Get Asset Information",
    display: {
      label: "Get Asset Information",
      description: "Given an asset ID, it returns asset information including creator, name, total supply and special addresses.",
    },
    operation: {
      inputFields: [
        {
          key: 'assetId',
          label: 'Asset ID',
          type: 'integer',
          required: true,
          helpText: 'The asset identifier',
        }
      ],
      perform: algodGetAsset,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "index": 12345,
        "params": {
          "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "decimals": 0,
          "total": 1000000,
          "defaultFrozen": false,
          "unitName": "UNIT",
          "assetName": "Test Asset",
          "url": "https://example.com",
          "manager": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "reserve": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "freeze": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "clawback": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        }
      },
    },
  };
