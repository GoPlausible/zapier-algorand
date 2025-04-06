const indexerGetApplicationLogs = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;
  if (bundle.inputData.txid) params.txid = bundle.inputData.txid;
  if (bundle.inputData.minRound) params['min-round'] = bundle.inputData.minRound;
  if (bundle.inputData.maxRound) params['max-round'] = bundle.inputData.maxRound;
  if (bundle.inputData.senderAddress) params['sender-address'] = bundle.inputData.senderAddress;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/applications/${bundle.inputData.applicationId}/logs`, {
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
  key: "indexerGetApplicationLogs",
  noun: "Application Logs",
  display: {
    label: "Get Application Logs",
    description: "Get log messages for a given application.",
  },
  
  operation: {
    perform: indexerGetApplicationLogs,
    inputFields: [
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: true,
        helpText: 'The application ID to look up logs for.',
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        helpText: 'Maximum number of results to return.',
      },
      {
        key: 'next',
        label: 'Next Page Token',
        type: 'string',
        required: false,
        helpText: 'Token for requesting the next page of results.',
      },
      {
        key: 'txid',
        label: 'Transaction ID',
        type: 'string',
        required: false,
        helpText: 'Filter by transaction ID.',
      },
      {
        key: 'minRound',
        label: 'Minimum Round',
        type: 'integer',
        required: false,
        helpText: 'Include results at or after the specified round.',
      },
      {
        key: 'maxRound',
        label: 'Maximum Round',
        type: 'integer',
        required: false,
        helpText: 'Include results at or before the specified round.',
      },
      {
        key: 'senderAddress',
        label: 'Sender Address',
        type: 'string',
        required: false,
        helpText: 'Filter by sender address.',
      }
    ],
    sample: {
      "application-id": 0,
      "current-round": 0,
      "next-token": "next-token",
      "log-data": [
        {
          "txid": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "sender": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
          "round": 0,
          "timestamp": 0,
          "logs": [
            "AAAA"
          ]
        }
      ]
    },
  },
};
