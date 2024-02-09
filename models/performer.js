const { default: mongoose } = require("mongoose");
const mngoose = require("mongoose");

const performerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);
const Performer = mongoose.model("Performer", performerSchema);
module.exports = {
  Performer,
};
