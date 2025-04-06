# Algorand Zapier Integration

This integration allows you to connect Algorand blockchain with thousands of other apps through Zapier. It provides various ways to interact with the Algorand network through searches and actions.

This repository is GoPlausible's remote contribution to [Algorand Developer Retreat](https://github.com/organizations/Algorand-Developer-Retreat). 

In Zapier integrations in general, integration functionality is defined in terms of **Triggers**, **Searches**, **Creates**, and **Resources**. These are how Zapier maps Algorand Algod and Indexer API's features into automation building blocks:

---



### 🔍 **1. Searches**

- **What it does**: Allows a Zap to look up data on the Algorand blockchain.
- **Usage**: Often used for finding account information, transactions, or application state.
- **Example**: "Get Account Information", "Find Transaction by ID".

```js
// Example Search from algod-get-account-information.js
const accountSearch = {
  key: 'algodGetAccountInformation',
  noun: 'Account',
  display: {
    label: 'Get Account Information',
    description: 'Get account balance and assets.',
  },
  operation: {
    inputFields: [{ 
      key: 'address',
      required: true,
      label: 'Account Address',
      helpText: 'Algorand account address to look up'
    }],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.url}/v2/accounts/${bundle.inputData.address}`,
        headers: {
          'X-Algo-API-Token': bundle.authData.apiKey
        }
      });
      return response.data;
    },
  },
};
```

---

### ➕ **2. Creates**

- **What it does**: Pushes new data to the Algorand blockchain.
- **Example**: "Compile TEAL", "Broadcast Transaction".

```js
// Example Create from algod-compile-teal.js
const compileTeal = {
  key: 'algodCompileTeal',
  noun: 'TEAL Program',
  display: {
    label: 'Compile TEAL Program',
    description: 'Compiles TEAL source code to binary and produces its hash',
  },
  operation: {
    inputFields: [
      {
        key: 'tealSource',
        label: 'TEAL Source Code',
        type: 'text',
        required: true,
        helpText: 'The TEAL source code to compile'
      }
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.url}/v2/teal/compile`,
        method: 'POST',
        headers: {
          'X-Algo-API-Token': bundle.authData.apiKey,
          'Content-Type': 'text/plain'
        },
        body: bundle.inputData.tealSource
      });
      return response.json;
    },
  },
};
```

---

### 🧱 **3. Resources**

- **What it does**: A reusable abstraction that combines related operations for Algorand entities.
- **Benefit**: Organizes operations by their related blockchain concepts.
- **Example**: The `account` resource combines account-related operations:
  - Search: Get Account Information
  - Search: Get Account Assets
  - Search: Get Account Applications

```js
// Example Resource from resources/account.js
const AccountResource = {
  key: 'account',
  noun: 'Account',
  get: {
    display: {
      label: 'Get Account',
      description: 'Gets account information from Algorand.',
    },
    operation: {
      inputFields: [{ 
        key: 'address',
        required: true,
        label: 'Account Address'
      }],
      perform: async (z, bundle) => {
        const response = await z.request({
          url: `${bundle.authData.url}/v2/accounts/${bundle.inputData.address}`,
          headers: {
            'X-Algo-API-Token': bundle.authData.apiKey
          }
        });
        return response.data;
      },
    },
  }
};
```

---

### ✅ **4. Triggers**

- **What it does**: Listens for new data or events from your API to *start* a Zap.
- **How it works**: Triggers typically **poll an API endpoint** (or optionally support webhooks) to get newly created or updated items.
- **Example**: "New Transaction in Account", "New Asset Created", or "New Application Deployed" (Note: triggers not yet completely implemented and are WIP).

```js
// Example Trigger (Currently no triggers implemented)
const triggerExample = {
  key: 'future_trigger',
  noun: 'Transaction',
  display: {
    label: 'New Transaction',
    description: 'Triggers when a new transaction is detected.',
  },
  operation: {
    perform: async (z, bundle) => {
      // Future implementation
    },
  },
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
Currently, there are no trigger operations implemented in this integration.

### Resources
The integration provides the following resources that combine related operations:

- `account`: Account-related operations
- `asset`: Asset-related operations
- `application`: Application-related operations
- `transaction`: Transaction-related operations
- `block`: Block-related operations
- `participation`: Participation-related operations

### Searches
Algorand Zapier integration provides numerous search operations to look up data on the Algorand blockchain:

#### Algod Node Searches

##### Account Related
- `algodGetAccountInformation`: Get account information
- `algodGetAccountApplicationInformation`: Get account's application information
- `algodGetAccountAssetInformation`: Get account's asset information
- `algodGetAccountPendingTransactions`: Get account's pending transactions

##### Application Related
- `algodGetApplication`: Get application information
- `algodGetApplicationBox`: Get application box data
- `algodGetApplicationBoxes`: List all application boxes

##### Asset Related
- `algodGetAsset`: Get asset information

##### Block Related
- `algodGetBlock`: Get block information
- `algodGetBlockHash`: Get block hash
- `algodGetLightBlockHeaderProof`: Get light block header proof

##### Transaction Related
- `algodGetTransactionParams`: Get transaction parameters
- `algodGetPendingTransactions`: List pending transactions
- `algodGetPendingTransactionInformation`: Get specific pending transaction details
- `algodGetTransactionProof`: Get transaction proof

##### State and Status
- `algodGetLedgerStateDelta`: Get ledger state delta
- `algodGetLedgerStateDeltaForTransactionGroup`: Get ledger delta for transaction group
- `algodGetTransactionGroupLedgerStateDeltasForRound`: Get transaction group ledger deltas for round
- `algodGetStatus`: Get node status
- `algodGetStatusAfterBlock`: Get status after specific block
- `algodGetLedgerSupply`: Get current supply information

##### Participation
- `algodGetParticipationKeys`: List participation keys
- `algodGetParticipationKeyById`: Get specific participation key

##### Version and Health
- `algodGetVersion`: Get version information
- `algodGetGenesis`: Get genesis information
- `algodGetMetrics`: Get node metrics
- `algodGetHealth`: Check node health
- `algodGetReady`: Check if node is ready

#### Indexer Node Searches

##### Account Related
- `indexerGetAccounts`: Search for accounts
- `indexerGetAccountById`: Get account information
- `indexerGetAccountAppsLocalState`: Get account's application local states
- `indexerGetAccountAssets`: Get account's assets
- `indexerGetAccountCreatedApplications`: Get applications created by account
- `indexerGetAccountCreatedAssets`: Get assets created by account
- `indexerGetAccountTransactions`: Get account's transaction history

##### Application Related
- `indexerGetApplications`: Search for applications
- `indexerGetApplicationById`: Get application information
- `indexerGetApplicationBoxByIdAndName`: Get application box by name
- `indexerGetApplicationBoxes`: List application boxes
- `indexerGetApplicationLogs`: Get application logs

##### Asset Related
- `indexerGetAssets`: Search for assets
- `indexerGetAssetById`: Get asset information
- `indexerGetAssetBalances`: Get asset holders
- `indexerGetAssetTransactions`: Get asset transactions

##### Block Related
- `indexerGetBlock`: Get block information

##### Transaction Related
- `indexerGetTransactions`: Search for transactions
- `indexerGetTransactionById`: Get transaction information

##### Health
- `indexerGetHealth`: Check indexer health

### Creates
Algorand Zapier integration provides several create operations to interact with the Algorand blockchain:

#### TEAL Operations
- `algodCompileTeal`: Compile TEAL source code to binary and produce its hash
- `algodDisassembleTeal`: Disassemble TEAL program bytes back into source code
- `algodDryrunTeal`: Execute TEAL program(s) in context and get debugging information
- `algodSimulateTransaction`: Simulate transaction execution as it would be evaluated on the network

#### Transaction Operations
- `algodBroadcastRawTransaction`: Broadcast a signed transaction or transaction group to the network

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
