const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected Successfully!");
  } catch (error) {
    console.log("Something went wrong while connecting Mongodb", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
