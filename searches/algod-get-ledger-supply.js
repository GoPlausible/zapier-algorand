const { v4: uuidv4 } = require('uuid');

const algodGetLedgerSupply = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/ledger/supply", {
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
    key: "algodGetLedgerSupply",
    noun: "Supply",
    display: {
      label: "Current Supply",
      description: "Get the current supply reported by the ledger.",
    },
    operation: {
      inputFields: [
        {
          key: 'unusedToken',
          label: 'INTERNAL USE ONLY: FORGET THIS!',
          type: 'string',
          required: false,
          helpText: 'The custom token to satisfy the search schema need for at least one search field. This is not used in the search.',
        }
      ],
      perform: algodGetLedgerSupply,
      sample: {
        "current_round": 12345,
        "online-money": 1234567,
        "total-money": 1234567
      },
    },
  };
