const { v4: uuidv4 } = require('uuid');

const algodGetAccountPendingTransactions = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/accounts/{{bundle.inputData.address}}/transactions/pending", {
        method: "GET",
        params: {
          max: "{{bundle.inputData.max}}",
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
    key: "algodGetAccountPendingTransactions",
    noun: "Get Account Pending Transactions",
    display: {
      label: "Get account pending transactions",
      description: "Get the list of pending transactions by address, sorted by priority, in decreasing order, truncated at the end at MAX. If MAX = 0, returns all pending transactions.",
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
          key: 'max',
          label: 'Maximum Transactions',
          type: 'integer',
          default: 0,
          required: true,
          helpText: 'Truncated number of transactions to display. If max=0, returns all pending transactions.',
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
      perform: algodGetAccountPendingTransactions,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "total-transactions": 1,
        "top-transactions": [
          {
            "sig": "signature",
            "txn": {
              "amt": 1000,
              "fee": 1000,
              "fv": 1000,
              "gen": "mainnet-v1.0",
              "gh": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
              "lv": 2000,
              "note": "note",
              "rcv": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "snd": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "type": "pay"
            }
          }
        ]
      },
    },
  };
