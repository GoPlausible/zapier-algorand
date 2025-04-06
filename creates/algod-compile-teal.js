const perform = async (z, bundle) => {
  const { tealSource, sourcemap } = bundle.inputData;

  // Construct URL with optional sourcemap parameter
  let url = `${bundle.authData.url}/v2/teal/compile`;
  if (sourcemap) {
    url += '?sourcemap=true';
  }

  // Make request to compile TEAL
  const response = await z.request({
    url,
    method: 'POST',
    headers: {
      'X-Algo-API-Token': bundle.authData.apiKey,
      'Content-Type': 'text/plain'
    },
    body: tealSource,
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
    throw new Error(`TEAL compilation failed: ${error.message}`);
  }
  if (response.status !== 200) {
    throw new Error(`Unexpected error: ${response.status}`);
  }

  // Return successful response
  return response.json;
};

module.exports = {
  key: 'algod_compile_teal',
  noun: 'TEAL Program',
  display: {
    label: 'Compile TEAL Program',
    description: 'Compiles TEAL source code to binary and produces its hash'
  },
  operation: {
    inputFields: [
      {
        key: 'tealSource',
        label: 'TEAL Source Code',
        type: 'text',
        required: true,
        helpText: 'The TEAL source code to compile'
      },
      {
        key: 'sourcemap',
        label: 'Include Source Map',
        type: 'boolean',
        required: false,
        default: false,
        helpText: 'When enabled, returns the source map of the program as JSON'
      }
    ],
    sample: {
      hash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
      result: 'base64EncodedProgramBytes==',
      sourcemap: {}
    },
    outputFields: [
      {
        key: 'hash',
        label: 'Program Hash',
        type: 'string'
      },
      {
        key: 'result',
        label: 'Compiled Bytes',
        type: 'string'
      },
      {
        key: 'sourcemap',
        label: 'Source Map',
        type: 'object'
      }
    ]
  }
};
