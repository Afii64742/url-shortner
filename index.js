import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./dbConnection/dbcon.js";

dotenv.config();

const app = express();

// Middleware (for parsing JSON, if needed)
app.use(express.json());

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
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});
