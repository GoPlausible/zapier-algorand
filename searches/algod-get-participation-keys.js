const { v4: uuidv4 } = require('uuid');

const algodGetParticipationKeys = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/participation", {
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
    key: "algodGetParticipationKeys",
    noun: "Participation Keys",
    display: {
      label: "Participation Keys List",
      description: "Return a list of participation keys.",
    },
    operation: {
      perform: algodGetParticipationKeys,
      inputFields: [
        {
          key: 'unusedToken',
          label: 'INTERNAL USE ONLY: FORGET THIS!',
          type: 'string',
          required: false,
          helpText: 'The custom token to satisfy the search schema need for at least one search field. This is not used in the search.',
        }
      ],
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
        "effectiveFirstValid": 0,
        "effectiveLastValid": 100000,
        "firstValid": 0,
        "lastValid": 100000,
        "voteID": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "selectionID": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "voteFirstValid": 0,
        "voteLastValid": 100000,
        "voteKeyDilution": 10000,
        "parent": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
        "stateProofID": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
      },
    },
  };
