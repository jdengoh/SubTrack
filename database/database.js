import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error('Please define the MongoDB URI inside .env.<development/production>.local');
}

const connectToDb = async () => {
  try {
    console.log('Connecting to database');
    await mongoose.connect(DB_URI);
    console.log(`DB Connected in ${NODE_ENV} mode!`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

export default connectToDb;
