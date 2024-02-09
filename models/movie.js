const mongoose = require("mongoose");

let reviewSchema = new mongoose.Schema(
  {
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      default: function () {
        return new Date().getFullYear();
      },
      min: 1927,
    },
    mpaaRating: {
      type: String,
      enum: ["G", "PG", "R", "PG 13"],
    },
    nowshowing: Boolean,
    reviews: [reviewSchema],
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Performer" }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = { Movie };
