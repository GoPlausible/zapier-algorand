const algodGetGenesis = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/genesis", {
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
    key: "algodGetGenesis",
    noun: "Algod Genesis",
    display: {
      label: "Algod Network Genesis Information",
      description: "Returns the entire genesis file in json.",
    },
    operation: {
      perform: algodGetGenesis,
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