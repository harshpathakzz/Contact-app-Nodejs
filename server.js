import express from "express";
import { config } from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

config(); // initialize dotenv

const app = express();

connectDB(); // connect to database
app.use(cors()); // to allow cross-origin requests

app.use(express.json()); // to accept JSON data in the body

const PORT = process.env.PORT || 5000;

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`)); // listen to port

app.use(errorHandler); // to handle errors
export default app;
