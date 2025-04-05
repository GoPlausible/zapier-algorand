const { v4: uuidv4 } = require('uuid');

const algodGetStatus = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/status", {
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
    key: "algodGetStatus",
    noun: "Get Node Status",
    display: {
      label: "Get Node Status",
      description: "Gets the current node status.",
    },
    operation: {
      perform: algodGetStatus,
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
        "catchpoint": "12345#ABCDEF",
        "catchpoint-acquired-blocks": 1000,
        "catchpoint-processed-accounts": 5000,
        "catchpoint-processed-kvs": 100,
        "catchpoint-total-accounts": 10000,
        "catchpoint-total-blocks": 2000,
        "catchpoint-total-kvs": 200,
        "catchpoint-verified-accounts": 4000,
        "catchpoint-verified-kvs": 80,
        "catchup-time": 1000000,
        "last-catchpoint": "12344#ABCDEF",
        "last-round": 12345,
        "last-version": "1.0",
        "next-version": "2.0",
        "next-version-round": 20000,
        "next-version-supported": true,
        "stopped-at-unsupported-round": false,
        "time-since-last-round": 2000000,
        "upgrade-delay": 10000,
        "upgrade-next-protocol-vote-before": 15000,
        "upgrade-no-votes": 100,
        "upgrade-node-vote": true,
        "upgrade-vote-rounds": 1000,
        "upgrade-votes": 500,
        "upgrade-votes-required": 800,
        "upgrade-yes-votes": 400
      },
    },
  };
