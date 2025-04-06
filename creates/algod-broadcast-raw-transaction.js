const perform = async (z, bundle) => {
  const { signedTransaction } = bundle.inputData;

  // Convert base64 string to binary buffer for request
  const binaryData = Buffer.from(signedTransaction, 'base64');

  // Make request to broadcast transaction
  const response = await z.request({
    url: `${bundle.authData.url}/v2/transactions`,
    method: 'POST',
    headers: {
      'X-Algo-API-Token': bundle.authData.apiKey,
      'Content-Type': 'application/x-binary'
    },
    body: binaryData,
    skipThrowForStatus: true
  });

  // Handle errors
  if (response.status === 400) {
    const error = response.json;
    throw new Error(`Invalid transaction: ${error.message}`);
  }
  if (response.status === 401) {
    throw new Error('Invalid API token');
  }
  if (response.status === 500) {
    throw new Error('Internal server error occurred');
  }
  if (response.status === 503) {
    throw new Error('Service temporarily unavailable');
  }
  if (response.status !== 200) {
    throw new Error(`Unexpected error: ${response.status}`);
  }

  // Return successful response
  return response.json;
};

module.exports = {
  key: 'algod_broadcast_raw_transaction',
  noun: 'Transaction',
  display: {
    label: 'Broadcast Raw Transaction',
    description: 'Broadcasts a raw signed transaction or transaction group to the network'
  },
  operation: {
    inputFields: [
      {
        key: 'signedTransaction',
        label: 'Signed Transaction',
        type: 'string',
        required: true,
        helpText: 'Base64 encoded signed transaction to broadcast'
      }
    ],
    sample: {
      txId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    },
    outputFields: [
      {
        key: 'txId',
        label: 'Transaction ID',
        type: 'string'
      }
    ]
  }
};
