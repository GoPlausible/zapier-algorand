const { v4: uuidv4 } = require('uuid');

const algodGetApplicationBoxes = async (z, bundle) => {
    const response = await z.request(
      "http://{{process.env.NETWORK}}-api.algonode.cloud/v2/applications/{{bundle.inputData.applicationId}}/boxes", {
        method: "GET",
        params: {
          max: "{{bundle.inputData.max}}"
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
    key: "algodGetApplicationBoxes",
    noun: "Get Application Boxes",
    display: {
      label: "Get application boxes",
      description: "Given an application ID, return all Box names. No particular ordering is guaranteed. Request fails when client or server-side configured limits prevent returning all Box names.",
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
          key: 'max',
          label: 'Maximum Boxes',
          type: 'integer',
          default: 0,
          required: true,
          helpText: 'Max number of box names to return. If max is not set, or max == 0, returns all box-names.',
        }
      ],
      perform: algodGetApplicationBoxes,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "boxes": [
          {
            "name": "Ym94MQ==" // base64 encoded "box1"
          },
          {
            "name": "Ym94Mg==" // base64 encoded "box2"
          }
        ]
      },
    },
  };
