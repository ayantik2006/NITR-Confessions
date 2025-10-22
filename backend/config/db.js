const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = mongodb;
