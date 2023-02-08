import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { globalRouter } from "./const/router.const.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB_NAME } =
  process.env;

const MONOG_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.udwh7m6.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(globalRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "0.0.0.0"; //localhost

mongoose.connect(MONOG_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MongoDB Connected");
    app.listen(PORT, HOST, () => {
      console.log(`Server is up at port ${PORT}`);
    });
  }
});
