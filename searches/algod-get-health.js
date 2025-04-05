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
    noun: "Get Algod Health Check",
    display: {
      label: "Get Algod Health Check",
      description: "Get Algod API and node health",
    },
    operation: {
      perform: algodGetHealth,
      sample: {
        "status": "OK",
      },
    },
  };