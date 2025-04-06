const { v4: uuidv4 } = require('uuid');

const algodGetTransactionProof = async (z, bundle) => {
    const response = await z.request(
      `http://{{process.env.NETWORK}}-api.algonode.cloud/v2/blocks/${bundle.inputData.round}/transactions/${bundle.inputData.txid}/proof`, {
        method: "GET",
        params: {
          hashtype: bundle.inputData.hashtype,
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
    key: "algodGetTransactionProof",
    noun: "Transaction Proof",
    display: {
      label: "Get Transaction Proof",
      description: "Get a proof for a transaction in a block.",
    },
    operation: {
      inputFields: [
        {
          key: 'round',
          label: 'Round',
          type: 'integer',
          required: true,
          helpText: 'The round in which the transaction appears.',
        },
        {
          key: 'txid',
          label: 'Transaction ID',
          type: 'string',
          required: true,
          helpText: 'The transaction ID for which to generate a proof.',
        },
        {
          key: 'hashtype',
          label: 'Hash Type',
          type: 'string',
          required: false,
          choices: ['sha512_256', 'sha256'],
          helpText: 'The type of hash function used to create the proof.',
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
      perform: algodGetTransactionProof,
      sample: {
        "hashtype": "sha512_256",
        "idx": 1,
        "proof": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "stibhash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "treedepth": 10
      },
    },
  };
