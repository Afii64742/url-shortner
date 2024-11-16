import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnection } from './dbConnection/dbcon.js';
import urlRoutes from './routes/url.js';

dotenv.config();

const app = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded data
app.use(express.json()); 

// ejs Template engine 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Adjust the path to match your folder structure

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// Connect to Database
dbConnection(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected successfully");

    // Start the server after a successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server started on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });

// Routes
app.use('/api/url', urlRoutes);

