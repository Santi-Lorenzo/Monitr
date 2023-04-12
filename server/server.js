require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

//---------------connection-----------------
const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "BudgetBuddy",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));
//------------------------------------------

const expensesRouter = require("./routes/expensesRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/"))); //dist
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);

// catch-all route handler for any requests to an unknown route
app.use("*", (req, res, next) => {
  res.staus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 404,
    message: { err: "An error occurred" },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

// starting server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
