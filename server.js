const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./App");
// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Replace <db_password> with actual password from environment variable
const DB = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
