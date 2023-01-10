import express from "express";
import dotenv from "dotenv";
import home from "./routes/home.js";
import mongo from "./models/db.js";
import user from "./routes/user.js";
import frined from "./routes/friends.js";
import trace from "./routes/trace.js";
import cors from "cors";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", home);
app.use("/user", user);
app.use("/friend", frined);
app.use("/trace", trace);
app.listen(process.env.PORT, () => {
  console.log(`Working on ${process.env.PORT}`);
});
