import dotenv from "dotenv";
dotenv.config();
import app from "./middleware/main.js";
import { connect } from "./db/index.js";
const port = process.env.PORT;
const db = process.env.DB || "mongodb://localhost:27017/express-ts";
const db_pass = process.env.DB_PASS || "password";
const start = async () => {
    console.log("Starting server...");
    await connect(db, db_pass);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
start();
