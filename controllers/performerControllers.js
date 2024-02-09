const { Performer } = require("../models/performer.js");

const getAddPerformer = async (req, res, next) => {
  try {
    const performers = await Performer.find({});
    res.render("performers/new", {
      performers: performers,
      title: "Add Performer",
    });
  } catch (error) {
    console.log(error.message);
  }
};
const postAddPerformer = async (req, res, next) => {
  try {
    const performer = await Performer.create(req.body);

    res.redirect("performers/new");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getAddPerformer, postAddPerformer };
