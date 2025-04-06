# Contributing to Algorand Zapier Integration

Thank you for your interest in contributing to the Algorand Zapier Integration! This document provides guidelines and instructions for contributing to this project.

## Project Structure

```
zapier-algorand/
├── creates/           # Create operations (POST/PUT endpoints)
├── resources/         # Resource definitions combining related operations
├── searches/          # Search operations (GET endpoints)
├── schemas/          # API schemas and documentation
├── triggers/         # Trigger operations (future implementations)
└── index.js         # Main entry point registering all components
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/GoPlausible/zapier-algorand.git
cd zapier-algorand
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment configuration:
```bash
cp .env.example .env
```

4. Configure your environment:
   - Set the network (mainnet/testnet)
   - Add your API token if needed

## Adding New Features

### Creating a New Search Operation

1. Create a new file in `searches/` directory:
```javascript
module.exports = {
  key: 'algodNewOperation',
  noun: 'Resource',
  display: {
    label: 'Find Resource',
    description: 'Description of what this search does.'
  },
  operation: {
    inputFields: [
      {key: 'parameter', required: true, label: 'Parameter Label'}
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.url}/v2/endpoint`,
        headers: {
          'X-Algo-API-Token': bundle.authData.apiKey
        }
      });
      return response.data;
    }
  }
};
```

2. Register in `index.js`:
```javascript
searches: {
  algodNewOperation: require('./searches/algod-new-operation')
}
```

### Creating a New Create Operation

1. Create a new file in `creates/` directory:
```javascript
module.exports = {
  key: 'algodNewCreate',
  noun: 'Resource',
  display: {
    label: 'Create Resource',
    description: 'Description of what this create does.'
  },
  operation: {
    inputFields: [
      {key: 'parameter', required: true, label: 'Parameter Label'}
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        method: 'POST',
        url: `${bundle.authData.url}/v2/endpoint`,
        headers: {
          'X-Algo-API-Token': bundle.authData.apiKey
        },
        body: bundle.inputData
      });
      return response.data;
    }
  }
};
```

2. Register in `index.js`:
```javascript
creates: {
  algodNewCreate: require('./creates/algod-new-create')
}
```

### Creating a New Resource

1. Create a new file in `resources/` directory:
```javascript
module.exports = {
  key: 'resourceName',
  noun: 'Resource',
  get: {
    display: {
      label: 'Get Resource',
      description: 'Gets a single resource.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Implementation
      }
    }
  },
  list: {
    display: {
      label: 'List Resources',
      description: 'Lists all resources.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Implementation
      }
    }
  }
};
```

2. Register in `index.js`:
```javascript
resources: {
  resourceName: require('./resources/resource-name')
}
```

## Code Style Guidelines

1. Use camelCase for variable and function names
2. Use descriptive names for operations (e.g., `algodGetAccountInformation`)
3. Include helpful descriptions and labels for all operations
4. Handle errors appropriately:
   ```javascript
   if (response.status === 404) {
     throw new Error('Resource not found');
   }
   ```

5. Use consistent formatting for API requests:
   ```javascript
   const response = await z.request({
     url: `${bundle.authData.url}/v2/endpoint`,
     headers: {
       'X-Algo-API-Token': bundle.authData.apiKey
     }
   });
   ```

## Documentation

When adding new features:
1. Update README.md with new capabilities
2. Include clear descriptions in operation definitions
3. Add helpful text for input fields
4. Document any special handling or considerations

## Submitting Changes

1. Create a new branch for your changes
2. Make your changes following the guidelines above
3. Update documentation as needed
4. Submit a pull request with a clear description of your changes

## Questions or Problems?

If you have questions or run into issues, please open a GitHub issue with:
1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Any relevant error messages
