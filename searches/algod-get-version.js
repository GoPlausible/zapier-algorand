const { v4: uuidv4 } = require('uuid');

const algodGetVersion = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/versions", {
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
    key: "algodGetVersion",
    noun: "Get Version Information",
    display: {
      label: "Get Version Information",
      description: "Retrieves the supported API versions, binary build versions, and genesis information.",
    },
    operation: {
      perform: algodGetVersion,
      inputFields: [
      {
        key: 'customToken',
        label: 'Custom Token',
        type: 'string',
        required: false,
        helpText: 'The custom token to use for the request',
      }
    ],
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "versions": [
          "v1",
          "v2"
        ],
        "genesis_hash_b64": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
        "genesis_id": "mainnet-v1.0",
        "build": {
          "major": 2,
          "minor": 1,
          "build_number": 5,
          "commit_hash": "abc123def",
          "branch": "master",
          "channel": "stable"
        }
      },
    },
  };
