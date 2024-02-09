const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB_URL = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(DB_URL).then(() => {
  console.log("db connected!");
});
