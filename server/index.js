import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Userrouter } from './router/user.js';

dotenv.config();

const app = express();

// Define allowed origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from localhost origins with any port
    if (origin && /^(http:\/\/localhost:\d+)$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(cookieParser());
app.use(express.json());
app.use('/auth', Userrouter);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const PORT = process.env.PORT || 7007;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err.message);
});
