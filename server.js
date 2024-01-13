import express from "express";
import * as Dotenv from "dotenv";
import cors from "cors";
import connect from "./database/connect.js";
import movieRouter from "./routes/movies.js";
// import { insertMovies } from "./controller/movie.controller.js";

Dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/movies", movieRouter);

app.listen(port, async () => {
  await connect();
  //   insertMovies()
  //     .then((docs) => console.log(docs))
  //     .catch((err) => console.log(err));
  console.log(`listening on port ${port}`);
});
