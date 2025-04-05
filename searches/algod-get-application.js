const { v4: uuidv4 } = require('uuid');

const algodGetApplication = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/applications/{{bundle.inputData.applicationId}}", {
        method: "GET",
        params: {
          format: "{{bundle.inputData.format}}"
        },
        headers: {
          'X-Algo-API-Token': '{{process.env.TOKEN}}',
        },
      }
    );
    if(response.data)response.data.id = uuidv4();
    return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
  };
  
  module.exports = {
    key: "algodGetApplication",
    noun: "Get Application Information",
    display: {
      label: "Get application information",
      description: "Given an application ID, it returns application information including creator, approval and clear programs, global and local schemas, and global state.",
    },
    operation: {
      inputFields: [
        {
          key: 'applicationId',
          label: 'Application ID',
          type: 'integer',
          required: true,
          helpText: 'The application identifier',
        },
        {
          key: 'format',
          label: 'Response Format',
          type: 'string',
          choices: ['json', 'msgpack'],
          required: false,
          default: 'json',
          helpText: 'Configures whether the response object is JSON or MessagePack encoded. Defaults to JSON.',
        }
      ],
      perform: algodGetApplication,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "params": {
          "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "approval-program": "AQEAAA==",
          "clear-state-program": "AQEAAA==",
          "local-state-schema": {
            "num-uint": 0,
            "num-byte-slice": 0
          },
          "global-state-schema": {
            "num-uint": 0,
            "num-byte-slice": 0
          }
        }
      },
    },
  };
