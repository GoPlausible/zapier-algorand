const { v4: uuidv4 } = require('uuid');

const algodGetBlockTimeStampOffset = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/devmode/blocks/offset", {
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
    key: "algodGetBlockTimeStampOffset",
    noun: "Get Block Timestamp Offset",
    display: {
      label: "Get Block Timestamp Offset",
      description: "Returns the timestamp offset. Timestamp offsets can only be set in dev mode.",
    },
    operation: {
      perform: algodGetBlockTimeStampOffset,
      inputFields: [
      {
        key: 'customToken',
        label: 'Custom Token',
        type: 'string',
        required: false,
        helpText: 'The custom token to use for the request',
      }
    ],
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "offset": 3600 // offset in seconds
      },
    },
  };
