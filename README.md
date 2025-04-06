# Algorand Zapier Integration

This integration allows you to connect Algorand blockchain with thousands of other apps through Zapier. It provides various ways to interact with the Algorand network through searches and actions.

This repository is [GoPlausible](https://goplausible.com)'s remote contribution to [Algorand Developer Retreat](https://github.com/Algorand-Developer-Retreat). 

This integration is powered by [Nodely](https://nodely.io/)'s great APIs for Algorand. Shoutout and kudos to [Nodely](https://nodely.io/) for their amazing work in providing a reliable and efficient API for Algorand, we all enjoy.

```

===============================================================================
 Language            Files        Lines         Code     Comments       Blanks
===============================================================================
 JavaScript             62         4589         4295           94          200
 JSON                    4        16980        16978            0            2
-------------------------------------------------------------------------------
 Markdown                3         2955            0         2226          729
 |- BASH                 2            5            5            0            0
 |- JavaScript           1           90           88            2            0
 |- JSON                 1           82           82            0            0
 (Total)                           3132          175         2228          729
===============================================================================
 Total                  69        24524        21273         2320          931
===============================================================================
```

## Project Structure

The repository is organized as follows:

```
zapier-algorand/
├── creates/                 # Create operations
│   ├── algod-broadcast-raw-transaction.js
│   ├── algod-compile-teal.js
│   ├── algod-disassemble-teal.js
│   ├── algod-dryrun-teal.js
│   └── algod-simulate-transaction.js
├── resources/              # Resource definitions
│   ├── account.js
│   ├── application.js
│   ├── asset.js
│   ├── block.js
│   ├── participation.js
│   └── transaction.js
├── schemas/               # API schemas
│   ├── algod_api.json
│   ├── indexer_api.json
│   └── zapier-schema.md
├── searches/              # Search operations
│   ├── algod-get-*.js    # Algod node searches
│   └── indexer-get-*.js  # Indexer node searches
├── triggers/             # Future trigger implementations
├── test/                # Test directory
├── .env.example         # Environment configuration template
├── .gitignore          # Git ignore rules
├── definition.json     # Zapier integration definition
├── index.js           # Main entry point
├── LICENSE           # License file
├── package.json     # Project metadata
├── README.md       # Project documentation
└── zapierwrapper.js # Zapier wrapper utilities
```

This structure ensures modularity and maintainability, with separate directories for triggers, searches, creates, and reusable resources.

This intergation exposes Algorand's data and functionality through Zapier's integration standard building blocks:

### 🔍 **1. Searches**

- **What it does**: Allows a Zap to look up data on the Algorand blockchain.
- **Usage**: Often used for finding account information, transactions, or application state.
- **Example**: "Get Account Information", "Find Transaction by ID".

```js
// Example Search from algod-get-account-information.js
const algodGetAccountInformation = {
  key: "algodGetAccountInformation",
  noun: "Account",
  display: {
    label: "Account Information",
    description: "Given a specific account public key, this call returns the accounts status, balance and spendable amounts",
  },
  operation: {
    inputFields: [
      {
        key: 'address',
        label: 'Account Address',
        type: 'string',
        required: true,
        helpText: 'An account public key in standard Algorand format (58 characters)',
      },
      {
        key: 'format',
        label: 'Response Format',
        type: 'string',
        choices: ['json', 'msgpack'],
        required: false,
        default: 'json',
        helpText: 'Configures whether the response object is JSON or MessagePack encoded.',
      }
    ],
    perform: async (z, bundle) => {
      const response = await z.request(
        `http://${process.env.NETWORK}-api.algonode.cloud/v2/accounts/${bundle.inputData.address}`,
        {
          method: "GET",
          headers: {
            'X-Algo-API-Token': process.env.TOKEN
          }
        }
      );
      return typeof response.data === "array" ? response.data : [response.data];
    }
  }
};
```

### ➕ **2. Creates**

- **What it does**: Pushes new data to the Algorand blockchain.
- **Example**: "Compile TEAL", "Broadcast Transaction".

```js
// Example Create from algod-compile-teal.js
module.exports = {
  key: 'algodCompileTeal',
  noun: 'TEAL Program',
  display: {
    label: 'Compile TEAL Program',
    description: 'Compiles TEAL source code to binary and produces its hash'
  },
  operation: {
    perform: async (z, bundle) => {
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
    
      return response.json;
    },
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
        default: 'false',
        helpText: 'When enabled, returns the source map of the program as JSON'
      }
    ]
  }
};
```

### 🧱 **3. Resources**

- **What it does**: A reusable abstraction that combines related operations for Algorand entities.
- **Benefit**: Organizes operations by their related blockchain concepts.
- **Example**: The `account` resource combines account-related operations:
  - Get: Get Account Information
  - Search: Find Accounts
  - List: Get Comprehensive Account Details

```js
// Example Resource from resources/account.js
module.exports = {
  key: 'account',
  noun: 'Account',
  
  // The get method uses algodGetAccountInformation
  get: {
    display: {
      label: 'Get Account',
      description: 'Gets information about a specific Algorand account by id.'
    },
    operation: {
      perform: getAccountInfo.operation.perform,
      inputFields: getAccountInfo.operation.inputFields,
      sample: getAccountInfo.operation.sample
    }
  },

  // The search method uses indexerGetAccounts
  search: {
    display: {
      label: 'Find Accounts',
      description: 'Search for Algorand accounts.'
    },
    operation: {
      perform: searchAccounts.operation.perform,
      inputFields: searchAccounts.operation.inputFields,
      sample: searchAccounts.operation.sample
    }
  },

  // The list method combines multiple searches
  list: {
    display: {
      label: 'List Account Details',
      description: 'Gets comprehensive information about an Algorand account.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Get basic account info
        const accountInfo = await getAccountInfo.operation.perform(z, bundle);
        
        // Get apps local state
        const appsLocalState = await getAccountAppsLocalState.operation.perform(z, bundle);
        
        // Get account assets
        const assets = await getAccountAssets.operation.perform(z, bundle);
        
        // Combine all the data
        return [{
          account: accountInfo,
          appsLocalState: appsLocalState,
          assets: assets
        }];
      },
      inputFields: [
        {key: 'accountId', label: 'Account Address', type: 'string', required: true}
      ]
    }
  }
};
```

### ✅ **4. Triggers** (Future Implementation)

- **What it does**: Listens for new data or events from the Algorand blockchain to *start* a Zap.
- **How it works**: Will poll for new blocks and transactions.
- **Example**: "New Block Created", "New Transaction in Account".

```js
// Example Trigger (Currently no triggers implemented)
const triggerExample = {
  key: 'future_trigger',
  noun: 'Block',
  display: {
    label: 'New Block',
    description: 'Triggers when a new block is added to the Algorand blockchain.',
  },
  operation: {
    perform: async (z, bundle) => {
      // Future implementation will poll for new blocks
      // and return block data
    },
  },
};
```

---

### ⚙️ Developer Notes

- In **Zapier Platform CLI**, each of these lives inside your `index.js` or modular files like `triggers/`, `creates/`, etc.
- **Each function** should return a **plain JS object** or an **array of objects**, each with a unique `id`.
- Make sure to use `z.request()` (Zapier's wrapper around Axios) for authenticated API calls with automatic OAuth2/session handling.

---

## Components

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

### Resources
The integration provides the following resources that combine related operations:

- `account`: Account-related operations
- `asset`: Asset-related operations
- `application`: Application-related operations
- `transaction`: Transaction-related operations
- `block`: Block-related operations
- `participation`: Participation-related operations


### 🚀 **4. Triggers**

Currently WIP but these are available:

Algorand Zapier integration provides triggers to listen for new data or events from the Algorand blockchain:

#### Account Triggers

##### List Account Details
- **Description**: Gets comprehensive information about an Algorand account by ID, including apps, assets, and transactions.
- **Input Fields**:
  - `Account Address`: The public key of the account (required).
- **Example Output**:
  ```json
  {
    "account": {
      "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "amount": 1234567,
      "status": "Online",
      "total-assets-opted-in": 0
    },
    "transactions": {
      "transactions": [
        {
          "id": "transaction-id",
          "type": "pay",
          "payment-transaction": {
            "amount": 0,
            "receiver": "receiver-address"
          }
        }
      ]
    }
  }
  ```

#### Asset Triggers

##### List Asset Details
- **Description**: Gets comprehensive information about an Algorand asset, including balances and transactions.
- **Input Fields**:
  - `Asset ID`: The unique identifier of the asset (required).
- **Example Output**:
  ```json
  {
    "asset": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "params": {
        "assetName": "Test Asset",
        "total": 1000000
      }
    },
    "balances": {
      "balances": [
        {
          "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
          "amount": 0
        }
      ]
    }
  }
  ```

#### Application Triggers

##### List Application Details
- **Description**: Gets comprehensive information about an Algorand application, including boxes and logs.
- **Input Fields**:
  - `Application ID`: The unique identifier of the application (required).
- **Example Output**:
  ```json
  {
    "application": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "params": {
        "creator": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      }
    },
    "logs": {
      "log-data": [
        {
          "txid": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          "logs": ["AAAA"]
        }
      ]
    }
  }
  ```

#### Transaction Triggers

##### List Transactions
- **Description**: Gets a list of Algorand transactions.
- **Input Fields**:
  - `Limit`: Maximum number of results to return (optional).
  - `Transaction Type`: Filter by transaction type (optional).
- **Example Output**:
  ```json
  {
    "transactions": [
      {
        "id": "transaction-id",
        "type": "pay",
        "payment-transaction": {
          "amount": 0,
          "receiver": "receiver-address"
        }
      }
    ]
  }
  ```

#### Block Triggers

##### List Block Transactions
- **Description**: Gets a list of transactions in a specific Algorand block.
- **Input Fields**:
  - `Block Round`: The round number of the block (required).
- **Example Output**:
  ```json
  {
    "transactions": [
      {
        "id": "transaction-id",
        "type": "pay",
        "payment-transaction": {
          "amount": 0,
          "receiver": "receiver-address"
        }
      }
    ]
  }
  ```

#### Participation Triggers

##### List Participation Keys
- **Description**: Gets a list of participation keys.
- **Example Output**:
  ```json
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "address": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
    "voteID": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
  }
  ```

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
