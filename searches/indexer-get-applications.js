const indexerGetApplications = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.applicationId) params['application-id'] = bundle.inputData.applicationId;
  if (bundle.inputData.creator) params.creator = bundle.inputData.creator;
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;
  if (bundle.inputData.next) params.next = bundle.inputData.next;

  const response = await z.request(
    "http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/applications", {
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
  key: "indexerGetApplications",
  noun: "Applications",
  display: {
    label: "Search Applications",
    description: "Search for applications with various filters.",
  },
  
  operation: {
    perform: indexerGetApplications,
    inputFields: [
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: false,
        helpText: 'Filter by application ID.',
      },
      {
        key: 'creator',
        label: 'Creator Address',
        type: 'string',
        required: false,
        helpText: 'Filter by the address that created the application.',
      },
      {
        key: 'includeAll',
        label: 'Include All',
        type: 'boolean',
        required: false,
        helpText: 'Include all items including closed accounts, deleted applications, etc.',
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
      "current-round": 0,
      "next-token": "next-token",
      "applications": [
        {
          "id": 0,
          "params": {
            "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
            "approval-program": "ASABASI=",
            "clear-state-program": "ASABASI=",
            "global-state-schema": {
              "num-uint": 0,
              "num-byte-slice": 0
            },
            "local-state-schema": {
              "num-uint": 0,
              "num-byte-slice": 0
            },
            "extra-program-pages": 0
          },
          "created-at-round": 0,
          "deleted": false,
          "deleted-at-round": 0
        }
      ]
    },
  },
};
