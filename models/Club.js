const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubName: { type: String, required: true },
  logo: String,
  themeColor1: String,
  themeColor2: String,
  athletes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Athlete" }],
});

module.exports = mongoose.model("Club", clubSchema);
