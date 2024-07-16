import { setupServer } from './server.js';
import { initMongoConnection } from './db/db.js';

initMongoConnection()
  .then(() => {
    setupServer();
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error.message);
  });
