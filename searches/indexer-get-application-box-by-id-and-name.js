const indexerGetApplicationBoxByIdAndName = async (z, bundle) => {
  const params = {};
  
  // Add required query parameters
  params.name = bundle.inputData.boxName;

  const response = await z.request(
    `http://{{process.env.NETWORK}}-idx.algonode.cloud/v2/applications/${bundle.inputData.applicationId}/box`, {
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
  key: "indexerGetApplicationBoxByIdAndName",
  noun: "Application Box",
  display: {
    label: "Get Application Box",
    description: "Get box information for a given application and box name.",
  },
  
  operation: {
    perform: indexerGetApplicationBoxByIdAndName,
    inputFields: [
      {
        key: 'applicationId',
        label: 'Application ID',
        type: 'integer',
        required: true,
        helpText: 'The application ID to look up box information for.',
      },
      {
        key: 'boxName',
        label: 'Box Name',
        type: 'string',
        required: true,
        helpText: 'A box name in goal-arg form \'encoding:value\'. For ints, use \'int:1234\'. For raw bytes, use \'b64:A==\'. For strings, use \'str:hello\'. For addresses, use \'addr:XYZ...\'.',
      }
    ],
    sample: {
      "name": "AAAA",
      "value": "AAAA"
    },
  },
};
