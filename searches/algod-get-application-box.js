const { v4: uuidv4 } = require('uuid');

const algodGetApplicationBox = async (z, bundle) => {
    let name = bundle.inputData.name;

    if (/^[A-Z2-7]{58}$/.test(name)) {
        name = `addr:${name}`;
    } else if (/^\d+$/.test(name)) {
        name = `int:${name}`;
    } else {
        name = `b64:${name}`;
    }

    const response = await z.request(
      `http://{{process.env.NETWORK}}-api.algonode.cloud/v2/applications/{{bundle.inputData.applicationId}}/box`, {
        method: "GET",
        params: {
          name: name
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
    key: "algodGetApplicationBox",
    noun: "Get Application Box",
    display: {
      label: "Get Application Box",
      description: "Given an application ID and box name, it returns the round, box name, and value (each base64 encoded). Box names must be in the goal app call arg encoding form 'encoding:value'. For ints, use the form 'int:1234'. For raw bytes, use the form 'b64:A=='. For printable strings, use the form 'str:hello'. For addresses, use the form 'addr:XYZ...'.",
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
          key: 'name',
          label: 'Box Name',
          type: 'string',
          required: true,
          helpText: "A box name, in the goal app call arg form 'encoding:value'. For ints, use the form 'int:1234'. For raw bytes, use the form 'b64:A=='. For printable strings, use the form 'str:hello'. For addresses, use the form 'addr:XYZ...'.",
        }
      ],
      perform: algodGetApplicationBox,
      sample: {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Ym94MQ==", // base64 encoded "box1"
        "round": 12345,
        "value": "AQIDBA==" // base64 encoded value
      },
    },
  };
