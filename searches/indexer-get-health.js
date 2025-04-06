const indexerGetHealth = async (z, bundle) => {
  const response = await z.request(
    "http://{{process.env.NETWORK}}-idx.algonode.cloud/health", {
      method: "GET",
      params: {},
      headers: {
        'X-Algo-API-Token': '{{process.env.TOKEN}}',
      },
    }
  );
  return typeof response.data === "array" ? response.data : response.data === null ? []:[response.data];
};

module.exports = {
  key: "indexerGetHealth",
  noun: "Indexer Health Status",
  display: {
    label: "Indexer Health Status Check",
    description: "Returns 200 if healthy. Gets Indexer API and node health status.",
  },
  
  operation: {
    perform: indexerGetHealth,
    inputFields: [
      {
        key: 'unusedToken',
        label: 'INTERNAL USE ONLY: FORGET THIS!',
        type: 'string',
        required: false,
        helpText: 'The custom token to satisfy the search schema need for at least one search field. This is not used in the search.',
      }
    ],
    sample: {
      "data": {},
      "db-available": true,
      "errors": [],
      "is-migrating": false,
      "message": "healthy",
      "round": 0,
      "version": "2.15.0"
    },
  },
};
