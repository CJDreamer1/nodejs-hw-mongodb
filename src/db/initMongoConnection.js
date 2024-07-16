import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Завантаження змінних оточення з .env файлу

export const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
      process.env;
    const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up Mongo connection:', error.message);
    throw error;
  }
};
