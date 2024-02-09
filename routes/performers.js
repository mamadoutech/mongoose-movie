const express = require("express");
const {
  getAddPerformer,
  postAddPerformer,
} = require("../controllers/performerControllers");

const router = express.Router();
router.get("/new", getAddPerformer);
router.post("/", postAddPerformer);
module.exports = router;
