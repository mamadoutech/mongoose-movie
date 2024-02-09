const express = require("express");
const router = express.Router();
const {
  getAddMovie,
  postNew,
  getMovies,
  getMovie,
  deleteMovie,
  getEdit,
  edit,
  postAddReview,
  getReviews,
  postDeleteReview,
  postAddPerformerInMovie,
} = require("../controllers/movieControllers");
router.get("/new", getAddMovie);
router.post("/", postNew);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.delete("/:id", deleteMovie);
router.get("/edit/:id", getEdit);
router.put("/:id", edit);
router.post("/:id/reviews", postAddReview);
router.post("/:id/performers", postAddPerformerInMovie);
router.get("/:id/reviews", getReviews);
router.delete("/:id/reviews/:reviewId", postDeleteReview);

module.exports = router;
