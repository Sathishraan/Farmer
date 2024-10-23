import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet'; // Optional, adds security headers
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { Addressrouter, Fuserrouter, Userrouter } from './router/user.js'; // Ensure correct imports

dotenv.config();

const app = express();

// Secure app by setting various HTTP headers
app.use(helmet());  // Adds basic security headers

// Define allowed origins and enable credentials
app.use(cors({
  origin: 'http://localhost:5173',  // Allow only from this specific origin (your frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Enable credentials for cookies or auth headers
}));

app.use(cookieParser());
app.use(express.json()); // Parse incoming JSON requests

// Mount the routers
app.use('/auth', Userrouter);       // User authentication routes
app.use('/auth', Fuserrouter);      // Other user-related routes
app.use('/auth', Addressrouter);    // Address-related routes

// MongoDB Connection with retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);  // Retry connection after 5 seconds
  });
};

connectWithRetry();  // Initial MongoDB connection attempt

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST'],        // Allowed methods
    credentials: true                // Enable credentials
  }
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle receiving a message
  socket.on('sendMessage', (msg) => {
    console.log('Message received:', msg);
    
    // Emit the message to the intended recipient
    io.emit('receiveMessage', msg); // Adjust this based on your logic
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

// Global 404 middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Resource not found',
    error: true
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal server error occurred',
    error: true
  });
});

// Start the server
const PORT = process.env.PORT || 7007;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err.message);
});
