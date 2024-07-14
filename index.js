import { setupServer } from './server.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';

try {
  setupServer();
  initMongoConnection();
} catch (error) {
  console.error(error);
}
