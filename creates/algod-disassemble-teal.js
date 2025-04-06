const perform = async (z, bundle) => {
  const { programBytes } = bundle.inputData;

  // Convert base64 string to binary buffer for request
  const binaryData = Buffer.from(programBytes, 'base64');

  // Make request to disassemble TEAL
  const response = await z.request({
    url: `${bundle.authData.url}/v2/teal/disassemble`,
    method: 'POST',
    headers: {
      'X-Algo-API-Token': bundle.authData.apiKey,
      'Content-Type': 'application/x-binary'
    },
    body: binaryData,
    skipThrowForStatus: true
  });

  // Handle errors
  if (response.status === 404) {
    throw new Error('Developer API not enabled on the node');
  }
  if (response.status === 401) {
    throw new Error('Invalid API token');
  }
  if (response.status === 400) {
    const error = response.json;
    throw new Error(`TEAL disassembly failed: ${error.message}`);
  }
  if (response.status === 500) {
    throw new Error('Internal server error occurred');
  }
  if (response.status !== 200) {
    throw new Error(`Unexpected error: ${response.status}`);
  }

  // Return successful response
  return response.json;
};

module.exports = {
  key: 'algod_disassemble_teal',
  noun: 'TEAL Program',
  display: {
    label: 'Disassemble TEAL Program',
    description: 'Disassembles TEAL program bytes back into source code'
  },
  operation: {
    inputFields: [
      {
        key: 'programBytes',
        label: 'Program Bytes',
        type: 'string',
        required: true,
        helpText: 'Base64 encoded TEAL program bytes to disassemble'
      }
    ],
    sample: {
      result: '#pragma version 6\nint 1\nreturn'
    },
    outputFields: [
      {
        key: 'result',
        label: 'TEAL Source Code',
        type: 'string'
      }
    ]
  }
};
