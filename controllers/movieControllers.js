const { Movie } = require("../models/movie");
const { Performer } = require("../models/performer");

const getAddMovie = (req, res, next) => {
  try {
    res.render("movies/new", { title: "Add Movie" });
  } catch (error) {
    console.log(error.message);
  }
};
const postNew = async (req, res, next) => {
  try {
    req.body.nowShowing = !!req.body.nowShowing;
    for (let key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }

    const { title, releaseYear, mpaaRating, cast, nowShowing } = req.body;
    const movie = await Movie.create({
      title,
      releaseYear,
      mpaaRating,
      cast,
      nowShowing,
    });
    res.redirect(`/movies/${movie._id}`);
  } catch (error) {
    console.log(error.message);
  }
};
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.render("movies/movies.ejs", { movies: movies, title: "Movies" });
  } catch (error) {
    console.log(error.message);
  }
};
const getMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id).populate("cast");
    const performers = await Performer.find({ _id: { $nin: movie.cast } });

    res.render("movies/details.ejs", {
      title: "Movie Details",
      movie: movie,
      performers: performers,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error.message);
  }
};
const getEdit = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render("movies/edit.ejs", {
      title: "Edit Movie",
      movie: movie,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const edit = async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.nowShowing = !!req.body.nowShowing;
    for (key in req.body) {
      if (req.body[key] === "") delete req.body[key];
    }
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect(`/movies/${movie._id}`);
  } catch (error) {
    console.log(error.message);
  }
};
const postAddReview = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    movie.reviews.push({
      content: req.body.content,
      rating: Number(req.body.rating),
    });

    const nmovie = await movie.save();
    res.redirect(`/movies/${movie._id}`);
  } catch (error) {
    console.log(error.message);
  }
};
const getReviews = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    // console.log(movie);
    res.render("movies/details", {
      title: "Movie Details",
      movie: movie,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const postDeleteReview = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    let index;
    if (movie) {
      index = movie.reviews.findIndex(
        (review) => review._id === req.params.reviewId
      );
    }
    movie.reviews.splice(index);
    await movie.save();
    res.redirect(`/movies/${movie._id}`);
  } catch (error) {
    console.log(error.message);
  }
};
const postAddPerformerInMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    const performer = await Performer.findById(req.body.performerId);
    movie.cast.push(performer);
    console.log(movie);
    movie.save();
    res.redirect(`/movies/${movie._id}`);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
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
};
