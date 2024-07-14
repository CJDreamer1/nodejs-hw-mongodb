import pino from 'pino-http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Завантаження змінних оточення з .env файлу

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const PORT = Number(process.env.PORT) || 3000;

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
