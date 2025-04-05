const { v4: uuidv4 } = require('uuid');

const algodGetBlockHash = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/blocks/{{bundle.inputData.round}}/hash", {
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
    key: "algodGetBlockHash",
    noun: "Get Block Hash",
    display: {
      label: "Get Block Hash",
      description: "Get the block hash for the block on the given round.",
    },
    operation: {
      inputFields: [
        {
          key: 'round',
          label: 'Round',
          type: 'integer',
          required: true,
          helpText: 'The round from which to fetch block hash information.',
        }
      ],
      perform: algodGetBlockHash,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "blockHash": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8="
      },
    },
  };
