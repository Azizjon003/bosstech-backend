import connect from "./db";
import dotenv from "dotenv";
dotenv.config();
import app from "./middleware/main";
const port = process.env.PORT || 3000;
const db = process.env.DB || "mongodb://localhost:27017/express-ts";
const db_pass = process.env.DB_PASS || "password";

const startcha = async () => {
  try {
    console.log("Starting server...");
    await connect(db, db_pass);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Server failed to start");
  }
};
startcha();
