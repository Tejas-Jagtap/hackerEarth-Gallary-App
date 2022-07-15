const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  imgName: {
    type: String,
    unique: true,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  imgDetails: {
    type: String,
    required: true,
  },
});

const Images = mongoose.model("Images", imgSchema);

module.exports = Images;
