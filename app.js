const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const app = express();
require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("uri", MONGODB_URI_PROD);
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter); // api라는 주소로 호출 오면 indexrouter로 가고-> 거기서 /task있으면 task.api로 이동
const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(
    mongoURI
    //, { useNewUrlParser: true }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db connection fail", err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("server on 5000");
});
