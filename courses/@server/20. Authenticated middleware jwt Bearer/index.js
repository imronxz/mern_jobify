import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors'
import morgan from 'morgan';

// TODO: dotenv
import dotenv from 'dotenv';
// TODO: connectDB and autentication
import connectDB from './db/connect.js';

// TODO: Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

//* middleware costum 404
import notFoundMiddleWare from './middleware/404.js';
import errorHandlerMiddleWare from './middleware/404-handler.js';
import authenticated from './middleware/auth.js';

const app = express();
dotenv.config();

//TODO: morgan
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

//TODO:  using #appAsExpress #coreExpress
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
//* cors policy
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({msg: 'Welcome to MERN Blog Project Menggunakan ExpressJS dan MongoDB'});
});
app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API Connect'});
});

//! app.use(authRouter, jobsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticated, jobsRouter);

//* middleware
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 5000;

/**
 * TODO: @mongoose
 * @Connect to MongoDB
 * @then {promise} app.listen(PORT, msg)
 * @catch {err}
 */
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_URL);
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
