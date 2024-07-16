import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function initMongoConnection() {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
      process.env;
    const DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(DB_URI);

    console.log('Database connected successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };
