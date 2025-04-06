const getApplication = require('../searches/algod-get-application');
const searchApplications = require('../searches/indexer-get-applications');
const getApplicationBoxes = require('../searches/algod-get-application-boxes');
const getApplicationLogs = require('../searches/indexer-get-application-logs');

// Define the application resource
module.exports = {
  key: 'application',
  noun: 'Application',
  
  // The get method uses algodGetApplication
  get: {
    display: {
      label: 'Get Application',
      description: 'Gets information about a specific Algorand application.'
    },
    operation: {
      perform: getApplication.operation.perform,
      inputFields: getApplication.operation.inputFields,
      sample: getApplication.operation.sample
    }
  },

  // The search method uses indexerGetApplications
  search: {
    display: {
      label: 'Find Application',
      description: 'Search for Algorand applications.'
    },
    operation: {
      perform: searchApplications.operation.perform,
      inputFields: searchApplications.operation.inputFields,
      sample: searchApplications.operation.sample
    }
  },

  // The list method combines multiple searches
  list: {
    display: {
      label: 'List Application Details',
      description: 'Gets comprehensive information about an Algorand application including boxes and logs.'
    },
    operation: {
      perform: async (z, bundle) => {
        // Get basic application info
        const applicationInfo = await getApplication.operation.perform(z, bundle);
        
        // Get application boxes
        const boxes = await getApplicationBoxes.operation.perform(z, bundle);
        
        // Get application logs
        const logs = await getApplicationLogs.operation.perform(z, bundle);

        // Combine all the data
        return [{
          application: applicationInfo,
          boxes: boxes,
          logs: logs
        }];
      },
      inputFields: [
        {key: 'applicationId', label: 'Application ID', type: 'integer', required: true}
      ],
      sample: {
        application: getApplication.operation.sample,
        boxes: getApplicationBoxes.operation.sample,
        logs: getApplicationLogs.operation.sample
      }
    }
  }
};
