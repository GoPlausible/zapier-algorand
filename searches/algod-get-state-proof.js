const { v4: uuidv4 } = require('uuid');

const algodGetStateProof = async (z, bundle) => {
    const response = await z.request(
      `http://{{process.env.NETWORK}}-api.algonode.cloud/v2/stateproofs/${bundle.inputData.round}`, {
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
    key: "algodGetStateProof",
    noun: "State Proof",
    display: {
      label: "State Proof",
      description: "Get a state proof that covers a given round.",
    },
    operation: {
      inputFields: [
        {
          key: 'round',
          label: 'Round',
          type: 'integer',
          required: true,
          helpText: 'The round for which a state proof is desired.',
        }
      ],
      perform: algodGetStateProof,
      sample: {
        "Message": {
          "BlockHeadersCommitment": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
          "FirstAttestedRound": 12345,
          "LastAttestedRound": 12345,
          "LnProvenWeight": 123,
          "VotersCommitment": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
        },
        "StateProof": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
      },
    },
  };
