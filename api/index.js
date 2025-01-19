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

// untuk test api 
app.use('/api/user', userRoutes);
app.use('/api/auth', authRaoutes); 
