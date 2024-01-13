import mongoose, { ObjectId, Schema } from "mongoose";

export default mongoose.model(
  "Movie",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  })
);
