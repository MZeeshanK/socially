import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
//import Post from './models/Post.js';
//import User from './models/User.js';
//import { users, posts } from './data/index.js';

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

connectDB();

const port = process.env.PORT || 5000;

// File Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with files
app.post('/api/auth/register', upload.single('picture'), register);
app.post('/api/posts', verifyToken, upload.single('picture'), createPost);

// Normal Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`.bgGreen));

//const importData = async () => {
  //await Post.deleteMany();
  //await User.deleteMany();
  //await Post.insertMany(posts);
  //await User.insertMany(users);
  //console.log('data Imported');
//};

// importData();
