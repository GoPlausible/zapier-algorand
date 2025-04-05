const { v4: uuidv4 } = require('uuid');

const algodGetStateProof = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/stateproofs/{{bundle.inputData.round}}", {
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
    noun: "Get State Proof",
    display: {
      label: "Get state proof",
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
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "Message": {
          "BlockHeadersCommitment": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
          "FirstAttestedRound": 1000000,
          "LastAttestedRound": 1001000,
          "LnProvenWeight": 1000,
          "VotersCommitment": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
        },
        "StateProof": {
          "Reveals": [
            {
              "ParticipationAccount": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
              "Weight": 1000
            }
          ],
          "SaltVersion": 1,
          "SignedWeight": 1000000
        }
      },
    },
  };
