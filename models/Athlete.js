const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const athleteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  birthYear: { type: Number, required: true },
  uuid: { type: String, default: uuidv4 },
  speedTest30m: Number,
  agilityTest: Number,
  flexibility: Number,
  verticalJump: Number,
  height: Number,
  weight: Number,
});

module.exports = mongoose.model("Athlete", athleteSchema);
