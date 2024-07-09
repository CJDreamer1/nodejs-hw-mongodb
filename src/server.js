import pino from 'pino-http';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
