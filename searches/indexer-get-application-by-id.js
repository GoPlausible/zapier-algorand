const indexerGetApplicationById = async (z, bundle) => {
  const params = {};
  
  // Add optional query parameters if provided
  if (bundle.inputData.includeAll) params['include-all'] = bundle.inputData.includeAll;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/applications/${bundle.inputData.applicationId}`, {
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
  key: "indexerGetApplicationById",
  noun: "Application",
  display: {
    label: "Get Application Information",
    description: "Lookup application information by application ID.",
  },
  
  operation: {
    perform: indexerGetApplicationById,
    inputFields: [
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: true,
        helpText: 'The application ID to look up.',
      },
      {
        key: 'includeAll',
        label: 'Include All',
        type: 'boolean',
        required: false,
        helpText: 'Include all items including closed accounts, deleted applications, etc.',
      }
    ],
    sample: {
      "current-round": 0,
      "application": {
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
    },
  },
};
