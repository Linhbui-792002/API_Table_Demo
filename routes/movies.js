import express from "express";
import { getAllMovie } from "../controller/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovie);

export default movieRouter;
