const indexerGetApplicationBoxes = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/applications/${bundle.inputData.applicationId}/boxes`, {
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
  key: "indexerGetApplicationBoxes",
  noun: "Application Boxes",
  display: {
    label: "Get Application Boxes",
    description: "Get all box names for a given application.",
  },
  
  operation: {
    perform: indexerGetApplicationBoxes,
    inputFields: [
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: true,
        helpText: 'The application ID to look up boxes for.',
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
      }
    ],
    sample: {
      "application-id": 0,
      "boxes": [
        {
          "name": "AAAA"
        }
      ],
      "next-token": "next-token"
    },
  },
};
