const { v4: uuidv4 } = require('uuid');

const algodGetLightBlockHeaderProof = async (z, bundle) => {
    const response = await z.request(
      `http://{{process.env.NETWORK}}-api.algonode.cloud/v2/blocks/${bundle.inputData.round}/lightheader/proof`, {
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
    key: "algodGetLightBlockHeaderProof",
    noun: "Light Block Header Proof",
    display: {
      label: "Light Block Header Proof",
      description: "Gets a proof for a given light block header inside a state proof commitment.",
    },
    operation: {
      inputFields: [
        {
          key: 'round',
          label: 'Round',
          type: 'integer',
          required: true,
          helpText: 'The round to which the light block header belongs.',
        }
      ],
      perform: algodGetLightBlockHeaderProof,
      sample: {
        "index": 1234,
        "proof": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "treedepth": 10
      },
    },
  };
