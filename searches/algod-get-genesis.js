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
    noun: "Get Algod Genesis",
    display: {
      label: "Get Algod Network Genesis",
      description: "Returns the entire genesis file in json.",
    },
    operation: {
      perform: algodGetGenesis,
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
        "status": "OK",
      },
    },
  };