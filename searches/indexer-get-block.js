const indexerGetBlock = async (z, bundle) => {
  const params = {};

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/blocks/${bundle.inputData.roundNumber}`, {
      method: "GET",
      params: params,
      headers: {
        'X-Algo-API-Token': '{{process.env.TOKEN}}',
      },
    }
  );
  return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
};

module.exports = {
  key: "indexerGetBlock",
  noun: "Block",
  display: {
    label: "Get Block Information",
    description: "Get information about a specific block.",
  },
  
  operation: {
    perform: indexerGetBlock,
    inputFields: [
      {
        key: 'roundNumber',
        label: 'Round Number',
        type: 'integer',
        required: true,
        helpText: 'The round number of the block to look up.',
      }
    ],
    sample: {
      "block": {
        "genesis-hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "genesis-id": "mainnet-v1.0",
        "previous-block-hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "rewards": {
          "fee-sink": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
          "rewards-calculation-round": 0,
          "rewards-level": 0,
          "rewards-pool": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
          "rewards-rate": 0,
          "rewards-residue": 0
        },
        "round": 0,
        "seed": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "timestamp": 0,
        "transactions": [],
        "transactions-root": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "txn-counter": 0,
        "upgrade-state": {
          "current-protocol": "future",
          "next-protocol": "future",
          "next-protocol-approvals": 0,
          "next-protocol-switch-on": 0,
          "next-protocol-vote-before": 0
        },
        "upgrade-vote": {
          "upgrade-approve": false,
          "upgrade-delay": 0,
          "upgrade-propose": "future"
        }
      },
      "current-round": 0
    },
  },
};
