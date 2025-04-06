const indexerGetTransactionById = async (z, bundle) => {
  const params = {};

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/transactions/${bundle.inputData.txid}`, {
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
  key: "indexerGetTransactionById",
  noun: "Transaction",
  display: {
    label: "Get Transaction Information",
    description: "Get information about a specific transaction.",
  },
  
  operation: {
    perform: indexerGetTransactionById,
    inputFields: [
      {
        key: 'txid',
        label: 'Transaction ID',
        type: 'string',
        required: true,
        helpText: 'The transaction ID to look up.',
      }
    ],
    sample: {
      "current-round": 0,
      "transaction": {
        "id": "transaction-id",
        "fee": 0,
        "first-valid": 0,
        "last-valid": 0,
        "sender": "sender-address",
        "type": "pay",
        "payment-transaction": {
          "amount": 0,
          "receiver": "receiver-address"
        },
        "confirmed-round": 0,
        "round-time": 0
      }
    },
  },
};
