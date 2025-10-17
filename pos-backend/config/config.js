require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURI: process.env.MONGODB_URI || "mongodb+srv://tyven:tyven25@cluster0.kvt5rmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  nodeEnv : process.env.NODE_ENV || "development",
  accessTokenSecret : process.env.JWT_SECRET
});

module.exports = config;