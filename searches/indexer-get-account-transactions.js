const indexerGetAccountTransactions = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;
  if (bundle.inputData.notePrefix) params['note-prefix'] = bundle.inputData.notePrefix;
  if (bundle.inputData.txType) params['tx-type'] = bundle.inputData.txType;
  if (bundle.inputData.sigType) params['sig-type'] = bundle.inputData.sigType;
  if (bundle.inputData.txid) params.txid = bundle.inputData.txid;
  if (bundle.inputData.round) params.round = bundle.inputData.round;
  if (bundle.inputData.minRound) params['min-round'] = bundle.inputData.minRound;
  if (bundle.inputData.maxRound) params['max-round'] = bundle.inputData.maxRound;
  if (bundle.inputData.assetId) params['asset-id'] = bundle.inputData.assetId;
  if (bundle.inputData.beforeTime) params['before-time'] = bundle.inputData.beforeTime;
  if (bundle.inputData.afterTime) params['after-time'] = bundle.inputData.afterTime;
  if (bundle.inputData.currencyGreaterThan) params['currency-greater-than'] = bundle.inputData.currencyGreaterThan;
  if (bundle.inputData.currencyLessThan) params['currency-less-than'] = bundle.inputData.currencyLessThan;
  if (bundle.inputData.rekeyTo) params['rekey-to'] = bundle.inputData.rekeyTo;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/accounts/${bundle.inputData.accountId}/transactions`, {
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
  key: "indexerGetAccountTransactions",
  noun: "Account Transactions",
  display: {
    label: "Get Account Transactions",
    description: "Lookup transactions for an account. Transactions are returned newest to oldest.",
  },
  
  operation: {
    perform: indexerGetAccountTransactions,
    inputFields: [
      {
        key: 'accountId',
        label: 'Account ID',
        type: 'string',
        required: true,
        helpText: 'The account address to look up transactions for.',
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
        key: 'notePrefix',
        label: 'Note Prefix',
        type: 'string',
        required: false,
        helpText: 'Specifies a prefix which must be contained in the note field (base64 encoded).',
      },
      {
        key: 'txType',
        label: 'Transaction Type',
        type: 'string',
        required: false,
        choices: ['pay', 'keyreg', 'acfg', 'axfer', 'afrz', 'appl', 'stpf'],
        helpText: 'Filter by transaction type.',
      },
      {
        key: 'sigType',
        label: 'Signature Type',
        type: 'string',
        required: false,
        choices: ['sig', 'msig', 'lsig'],
        helpText: 'Filter by signature type.',
      },
      {
        key: 'txid',
        label: 'Transaction ID',
        type: 'string',
        required: false,
        helpText: 'Filter by transaction ID.',
      },
      {
        key: 'round',
        label: 'Round',
        type: 'integer',
        required: false,
        helpText: 'Filter by specific round.',
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
        key: 'assetId',
        label: 'Asset ID',
        type: 'integer',
        required: false,
        helpText: 'Filter by asset ID.',
      },
      {
        key: 'beforeTime',
        label: 'Before Time',
        type: 'string',
        required: false,
        helpText: 'Include results before this time (RFC 3339 format).',
      },
      {
        key: 'afterTime',
        label: 'After Time',
        type: 'string',
        required: false,
        helpText: 'Include results after this time (RFC 3339 format).',
      },
      {
        key: 'currencyGreaterThan',
        label: 'Amount Greater Than',
        type: 'integer',
        required: false,
        helpText: 'Results should have an amount greater than this value.',
      },
      {
        key: 'currencyLessThan',
        label: 'Amount Less Than',
        type: 'integer',
        required: false,
        helpText: 'Results should have an amount less than this value.',
      },
      {
        key: 'rekeyTo',
        label: 'Rekey To',
        type: 'boolean',
        required: false,
        helpText: 'Include results which include the rekey-to field.',
      }
    ],
    sample: {
      "current-round": 0,
      "next-token": "next-token",
      "transactions": [
        {
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
      ]
    },
  },
};
