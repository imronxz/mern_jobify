import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_URL);
    await Job.deleteMany();

    const jsonData = JSON.parse(
      await readFile(new URL('./MOCK_DATA.json', import.meta.url)),
    );
    await Job.create(jsonData);
    console.log('Berhasil!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
