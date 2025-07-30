import express from 'express';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDb from './database/database.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); // handle JSON requests
app.use(express.urlencoded({ extended: false })); // process form data
app.use(cookieParser()); // parse cookies

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`SubTrack is running on http://localhost:${PORT}`);

  await connectToDb();
});

app.get('/', (req, res) => {
  res.send('Welcome to SubTrack!');
});

export default app;
