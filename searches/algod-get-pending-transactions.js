const { v4: uuidv4 } = require('uuid');

const algodGetPendingTransactions = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/transactions/pending", {
        method: "GET",
        params: {
          max: "{{bundle.inputData.max}}",
          format: "{{bundle.inputData.format}}",
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
    key: "algodGetPendingTransactions",
    noun: "Get Pending Transactions",
    display: {
      label: "Get Pending Transactions",
      description: "Get the list of pending transactions, sorted by priority, in decreasing order, truncated at the end at MAX. If MAX = 0, returns all pending transactions.",
    },
    operation: {
      inputFields: [
        {
          key: 'max',
          label: 'Maximum Transactions',
          type: 'integer',
          default: "0",
          required: false,
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
      perform: algodGetPendingTransactions,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "total-transactions": 2,
        "top-transactions": [
          {
            "sig": "signature1",
            "txn": {
              "amt": 1000,
              "fee": 1000,
              "fv": 1000,
              "gen": "mainnet-v1.0",
              "gh": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
              "lv": 2000,
              "note": "note1",
              "rcv": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "snd": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "type": "pay"
            }
          },
          {
            "sig": "signature2",
            "txn": {
              "amt": 2000,
              "fee": 1000,
              "fv": 1000,
              "gen": "mainnet-v1.0",
              "gh": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
              "lv": 2000,
              "note": "note2",
              "rcv": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "snd": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "type": "pay"
            }
          }
        ]
      },
    },
  };
