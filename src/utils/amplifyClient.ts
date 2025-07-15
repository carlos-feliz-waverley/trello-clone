import { generateClient } from 'aws-amplify/data';

const client = generateClient({
  models: {
    Task: {
      title: 'string',
      description: 'string',
      assignee: 'string',
      status: 'string',
      createdAt: 'timestamp'
    }
  }
});

export default client;
