const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

// Connection string
const uri = "mongodb+srv://austineochieng101:bPichGyJlQjW8gOJ@cluster0.l5xcwl1.mongodb.net/expensesDB?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

// CORS config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);

module.exports = app;
