const { v4: uuidv4 } = require('uuid');

const algodGetTransactionParams = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/transactions/params", {
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
    key: "algodGetTransactionParams",
    noun: "Transaction Parameters",
    display: {
      label: "Transaction Parameters",
      description: "Get parameters for constructing a new transaction.",
    },
    operation: {
      inputFields: [],
      perform: algodGetTransactionParams,
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
        "consensus-version": "https://github.com/algorandfoundation/specs/tree/d5ac876d7ede07367dbaa26e149aa42589aac1f7",
        "fee": 1000,
        "genesis-hash": "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
        "genesis-id": "mainnet-v1.0",
        "last-round": 12345,
        "min-fee": 1000
      },
    },
  };
