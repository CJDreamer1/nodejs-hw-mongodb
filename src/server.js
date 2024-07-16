import pino from 'pino-http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { getAllContacts } from './controllers/contacts.js';

dotenv.config(); // Завантаження змінних оточення з .env файлу

const PORT = Number(process.env.PORT) || 3000; // Завдання значення за замовчуванням

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getAllContacts);

  app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
