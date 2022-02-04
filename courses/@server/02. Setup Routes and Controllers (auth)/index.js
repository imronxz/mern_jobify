import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// TODO: dotenv
import dotenv from 'dotenv';
// TODO: connectDB and autentication
import connectDB from './db/connect.js.js';

// TODO: Routers
import authRouter from './routes/authRouters.js';

//* middleware costum 404
import notFoundMiddleWare from './middleware/404.js.js';
import errorHandlerMiddleWare from './middleware/404-handler.js.js';

const app = express();
dotenv.config();

//TODO:  using #appAsExpress #coreExpress
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
//* cors policy
app.use(cors());
app.use(express.json())


// * middleware
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

app.get('/', (req, res) => {
  res.send('Welcome to MERN Blog Project Menggunakan ExpressJS dan MongoDB');
});

app.use('/api/v1/auth', authRouter)


const PORT = process.env.PORT || 5000;

/**
 * TODO: @mongoose
 * @Connect to MongoDB
 * @then {promise} app.listen(PORT, msg)
 * @catch {err}
 */
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_URL).then(() =>
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)),
    );
  } catch (error) {
    console.log(error);
  }
};

start()
