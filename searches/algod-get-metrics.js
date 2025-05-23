const { v4: uuidv4 } = require('uuid');

const algodGetMetrics = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/metrics", {
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
    key: "algodGetMetrics",
    noun: "Get Metrics",
    display: {
      label: "Get Metrics",
      description: "Return metrics about algod functioning! Not for public use. Only use with a token configured",
    },
    operation: {
      perform: algodGetMetrics,
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
        "key": "algod_network_peer_count",
        "value": "42"
      },
    },
  };
