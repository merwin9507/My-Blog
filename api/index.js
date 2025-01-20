import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRaoutes from './routes/auth.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO)

.then(() => {
  console.log('MongoDb is connected');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRaoutes); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    succes: false,
    statusCode,
    message,
  });
});
