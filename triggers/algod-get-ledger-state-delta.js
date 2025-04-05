const { v4: uuidv4 } = require('uuid');

const algodGetLedgerStateDelta = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/deltas/{{bundle.inputData.round}}", {
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
    noun: "Get Ledger State Delta",
    display: {
      label: "Get ledger state delta",
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
          choices: ['json', 'msgpack'],
          required: false,
          default: 'json',
          helpText: 'Configures whether the response object is JSON or MessagePack encoded. Defaults to JSON.',
        }
      ],
      perform: algodGetLedgerStateDelta,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "accts": {
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ": {
            "algo": {
              "at": 12345,
              "dc": 1000
            }
          }
        },
        "txns": {
          "tx1": {
            "caid": 1234,
            "ca": {
              "at": 5000,
              "dc": 1000
            }
          }
        }
      },
    },
  };
