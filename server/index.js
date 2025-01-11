import dotenv from "dotenv"
dotenv.config();

import express from 'express';
import cors from 'cors'
import connectDb from "./db.js";

const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());


connectDb().then(() =>
  app.listen(PORT, () => console.log(` Server listening on port ${PORT}!`))
);