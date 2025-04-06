const { v4: uuidv4 } = require('uuid');
const algodGetAccountInformation = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/accounts/{{bundle.inputData.address}}", {
        method: "GET",
        params: {
          format: "{{bundle.inputData.format}}",
          exclude: "{{bundle.inputData.exclude}}",
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
    key: "algodGetAccountInformation",
    noun: "Account",
    display: {
      label: "Account Information",
      description: "Given a specific account public key, this call returns the accounts status, balance and spendable amounts",
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
          key: 'format',
          label: 'Response Format',
          type: 'string',
          choices: ['json', 'msgpack'],
          required: false,
          default: 'json',
          helpText: 'Configures whether the response object is JSON or MessagePack encoded. Defaults to JSON.',
        },
        {
          key: 'exclude',
          label: 'Exclude Fields',
          type: 'string',
          choices: ['all', 'none'],
          required: false,
          default: 'none',
          helpText: 'When set to "all" will exclude asset holdings, application local state, created asset parameters, any created application parameters. Defaults to "none".',
        },
      ],
      perform: algodGetAccountInformation,
      sample: {
        "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "amount": 1234567,
        "amount-without-pending-rewards": 1234567,
        "min-balance": 100000,
        "pending-rewards": 0,
        "rewards": 0,
        "round": 12345,
        "status": "Online",
        "total-apps-opted-in": 0,
        "total-assets-opted-in": 0,
        "total-created-apps": 0,
        "total-created-assets": 0
      },
    },
  };
