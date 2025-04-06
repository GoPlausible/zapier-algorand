const algodGetHealth = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/health", {
        method: "GET",
        params: {},
        headers: {
          'X-Algo-API-Token': '{{process.env.TOKEN}}',
        },
      }
    );
    return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
  };
  
  module.exports = {
    key: "algodGetHealth",
    noun: "Algod Health Status",
    display: {
      label: "Algod Health Status Check Information",
      description: "Get Algod API and node health status. if response is OK (status 200), the node is healthy.",
    },
    
    operation: {
      perform: algodGetHealth,
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
        "status": "OK",
      },
    },
  };