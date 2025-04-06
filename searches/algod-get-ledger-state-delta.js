const { v4: uuidv4 } = require('uuid');

const algodGetLedgerStateDelta = async (z, bundle) => {
    const response = await z.request(
      `http://{{process.env.NETWORK}}-api.algonode.cloud/v2/deltas/${bundle.inputData.round}`, {
        method: "GET",
        params: {
          format: bundle.inputData.format
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
    key: "algodGetLedgerStateDelta",
    noun: "Ledger State Delta",
    display: {
      label: "Ledger State Delta",
      description: "Get ledger deltas for a round.",
    },
    operation: {
      inputFields: [
        {
          key: 'round',
          label: 'Round',
          type: 'integer',
          required: true,
          helpText: 'The round for which the deltas are desired.',
        },
        {
          key: 'format',
          label: 'Response Format',
          type: 'string',
          required: false,
          choices: ['json', 'msgpack'],
          helpText: 'Configures whether the response object is JSON or MessagePack encoded.',
        }
      ],
      perform: algodGetLedgerStateDelta,
      sample: {
        "accts": {
          "accounts": [
            {
              "addr": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              "data": {
                "algo": "1234567",
                "onl": 1,
                "sel": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
              }
            }
          ]
        },
        "kvmod": [
          {
            "key": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
            "value": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
          }
        ]
      },
    },
  };
