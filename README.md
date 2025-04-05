# Algorand Zapier Integration

This integration allows you to connect Algorand blockchain with thousands of other apps through Zapier. It provides various ways to interact with the Algorand network through searches and actions.

In Zapier integrations in general, your app's functionality is defined in terms of **Triggers**, **Searches**, **Creates**, and **Resources**. These are how Zapier maps your API's features into automation building blocks:

---

### ✅ **1. Triggers**

- **What it does**: Listens for new data or events from your API to *start* a Zap.
- **How it works**: Triggers typically **poll an API endpoint** (or optionally support webhooks) to get newly created or updated items.
- **Example**: "New Transaction in Wallet", "New VC Issued", or "New DID Registered".

```js
// Example Trigger in Zapier CLI
const newItemTrigger = {
  key: 'new_item',
  noun: 'Item',
  display: {
    label: 'New Item',
    description: 'Triggers when a new item is created.',
  },
  operation: {
    perform: async (z, bundle) => {
      const response = await z.request('https://api.example.com/items');
      return response.data;
    },
  },
};
```

---

### 🔍 **2. Searches**

- **What it does**: Allows a Zap to look something up in your system.
- **Usage**: Often used for finding a user, resource, or record before creating something to avoid duplicates.
- **Example**: "Find DID by Handle", "Find Wallet by Address".

```js
const findItemSearch = {
  key: 'find_item',
  noun: 'Item',
  display: {
    label: 'Find Item',
    description: 'Finds an existing item by ID.',
  },
  operation: {
    inputFields: [{ key: 'id', required: true }],
    perform: async (z, bundle) => {
      const response = await z.request(`https://api.example.com/items/${bundle.inputData.id}`);
      return response.data ? [response.data] : [];
    },
  },
};
```

---

### ➕ **3. Creates**

- **What it does**: Pushes new data into your app (i.e., makes a POST or PUT).
- **Example**: "Create a new DID", "Issue a Credential", "Mint a PLAUS".

```js
const createItem = {
  key: 'create_item',
  noun: 'Item',
  display: {
    label: 'Create Item',
    description: 'Creates a new item in your app.',
  },
  operation: {
    inputFields: [
      { key: 'name', required: true },
      { key: 'type' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        method: 'POST',
        url: 'https://api.example.com/items',
        body: {
          name: bundle.inputData.name,
          type: bundle.inputData.type,
        },
      });
      return response.data;
    },
  },
};
```

---

### 🧱 **4. Resources**

- **What it does**: A reusable abstraction that **combines Triggers, Searches, and Creates** related to a single object (like `Item`, `Wallet`, or `DID`).
- **Benefit**: Helps you **DRY** your integration and provide a consistent interface.
- **Example**: A `DID` resource might have:
  - Trigger: New DID Registered
  - Search: Find DID by ID
  - Create: Create a DID

```js
const ItemResource = {
  key: 'item',
  noun: 'Item',
  get: {
    display: {
      label: 'Get Item',
      description: 'Gets a single item.',
    },
    operation: {
      inputFields: [{ key: 'id', required: true }],
      perform: async (z, bundle) => {
        const response = await z.request(`https://api.example.com/items/${bundle.inputData.id}`);
        return response.data;
      },
    },
  },
  list: {
    display: {
      label: 'List Items',
      description: 'Lists all items.',
    },
    operation: {
      perform: async (z, bundle) => {
        const response = await z.request('https://api.example.com/items');
        return response.data;
      },
    },
  },
  create: createItem.operation,  // reuse
  search: findItemSearch.operation,  // reuse
};
```

---

### ⚙️ Developer Notes

- In **Zapier Platform CLI**, each of these lives inside your `index.js` or modular files like `triggers/`, `creates/`, etc.
- **Each function** should return a **plain JS object** or an **array of objects**, each with a unique `id`.
- Make sure to use `z.request()` (Zapier’s wrapper around Axios) for authenticated API calls with automatic OAuth2/session handling.

---


## Components
### Triggers
### Resources
### Searches
Algorand Zapier integration provides numerous search operations to look up data on the Algorand blockchain:

#### Account Related
- `algodGetAccountInformation`: Get account information
- `algodGetAccountApplicationInformation`: Get account's application information
- `algodGetAccountAssetInformation`: Get account's asset information
- `algodGetAccountPendingTransactions`: Get account's pending transactions

#### Application Related
- `algodGetApplication`: Get application information
- `algodGetApplicationBox`: Get application box data
- `algodGetApplicationBoxes`: List all application boxes

#### Asset Related
- `algodGetAsset`: Get asset information

#### Block Related
- `algodGetBlock`: Get block information
- `algodGetBlockHash`: Get block hash
- `algodGetLightBlockHeaderProof`: Get light block header proof

#### Transaction Related
- `algodGetTransactionParams`: Get transaction parameters
- `algodGetPendingTransactions`: List pending transactions
- `algodGetPendingTransactionInformation`: Get specific pending transaction details
- `algodGetTransactionProof`: Get transaction proof

#### State and Status
- `algodGetLedgerStateDelta`: Get ledger state delta
- `algodGetLedgerStateDeltaForTransactionGroup`: Get ledger delta for transaction group
- `algodGetTransactionGroupLedgerStateDeltasForRound`: Get transaction group ledger deltas for round
- `algodGetStatus`: Get node status
- `algodWaitForBlock`: Wait for specific block
- `algodGetBlockTimeStampOffset`: Get block timestamp offset

#### Participation
- `algodGetParticipationKeys`: List participation keys
- `algodGetParticipationKeyById`: Get specific participation key

#### Version and Health
- `algodGetVersion`: Get version information
- `algodGetGenesis`: Get genesis information
- `algodGetMetrics`: Get node metrics
- `algodGetHealthCheck`: Check node health
- `algodGetReady`: Check if node is ready

## Usage

Each search operation accepts specific parameters as defined in the Algorand API specification and returns structured data that can be used in subsequent steps of your Zap.

## Authentication

The integration uses API token authentication. You'll provide in ENV variables:
- Network selection (mainnet/testnet)
- API Token (Optional)

Look at .env.example file and make a copy of it before start and make your changes there (network selection and token usage)

```bash
cp .env.example .env
```

## Error Handling

All operations include proper error handling for:
- Invalid API Token (401)
- Bad Requests (400)
- Not Found Resources (404)
- Internal Errors (500)
- Service Unavailable (503)

## Development

This integration is built using the Zapier CLI Platform. To contribute:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Make changes
5. Submit a pull request

## Notes

- All search operations follow consistent patterns for error handling and response formatting
- Each operation includes detailed sample responses for testing
- Operations that return arrays are properly handled with UUID generation for Zapier's deduplication
