const { v4: uuidv4 } = require('uuid');

const algodGetParticipationKeyById = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/participation/{{bundle.inputData.participationId}}", {
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
    key: "algodGetParticipationKeyById",
    noun: "Participation Key",
    display: {
      label: "Participation Key by ID",
      description: "Given a participation ID, return information about that participation key.",
    },
    operation: {
      inputFields: [
        {
          key: 'participationId',
          label: 'Participation ID',
          type: 'string',
          required: true,
          helpText: 'The participation ID to get information about.',
        }
      ],
      perform: algodGetParticipationKeyById,
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
