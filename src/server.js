import pino from 'pino-http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRoutes from './routers/contacts.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
  const app = express();

  app.use(contactsRoutes);

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
