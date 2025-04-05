const { v4: uuidv4 } = require('uuid');

const algodGetPendingTransactionInformation = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/transactions/pending/{{bundle.inputData.txid}}", {
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
    key: "algodGetPendingTransactionInformation",
    noun: "Get Pending Transaction Information",
    display: {
      label: "Get Pending Transaction Information",
      description: "Given a transaction ID of a recently submitted transaction, it returns information about it. Shows if transaction is committed, still in pool, or removed from pool due to error.",
    },
    operation: {
      inputFields: [
        {
          key: 'txid',
          label: 'Transaction ID',
          type: 'string',
          required: true,
          helpText: 'A transaction ID.',
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
      perform: algodGetPendingTransactionInformation,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "application-index": 1234,
        "asset-index": 5678,
        "close-rewards": 100,
        "confirmed-round": 12345,
        "global-state-delta": [
          {
            "key": "key1",
            "value": {
              "action": 1,
              "bytes": "val1",
              "uint": 1000
            }
          }
        ],
        "local-state-delta": [
          {
            "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
            "delta": [
              {
                "key": "key1",
                "value": {
                  "action": 1,
                  "bytes": "val1",
                  "uint": 1000
                }
              }
            ]
          }
        ],
        "pool-error": "",
        "receiver-rewards": 200,
        "sender-rewards": 300,
        "txn": {
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
      },
    },
  };
