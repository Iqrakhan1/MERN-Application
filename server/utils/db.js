const mongoose = require("mongoose");
const URI = process.env.MANGODB_URI;
// mongoose.connect(URI);

const MongoosDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database succesfully conected");
  } catch (error) {
    console.error("databse connection failed ");
    process.exit(0);
  }
};

module.exports = MongoosDb;
