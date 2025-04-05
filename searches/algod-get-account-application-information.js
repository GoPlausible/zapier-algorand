const { v4: uuidv4 } = require('uuid');

const algodGetAccountApplicationInformation = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/accounts/{{bundle.inputData.address}}/applications/{{bundle.inputData.applicationId}}", {
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
    key: "algodGetAccountApplicationInformation",
    noun: "Get Account Application Information",
    display: {
      label: "Get account information about a given app",
      description: "Given a specific account public key and application ID, this call returns the account's application local state and global state (AppLocalState and AppParams, if either exists). Global state will only be returned if the provided address is the application's creator.",
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
          key: 'applicationId',
          label: 'Application ID',
          type: 'integer',
          required: true,
          helpText: 'The application identifier',
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
      perform: algodGetAccountApplicationInformation,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "round": 12345,
        "app-local-state": {
          "id": 1234,
          "schema": {
            "num-uint": 0,
            "num-byte-slice": 0
          }
        },
        "created-app": {
          "approval-program": "AQEAAA==",
          "clear-state-program": "AQEAAA==",
          "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "global-state-schema": {
            "num-uint": 0,
            "num-byte-slice": 0
          },
          "local-state-schema": {
            "num-uint": 0,
            "num-byte-slice": 0
          }
        }
      },
    },
  };
