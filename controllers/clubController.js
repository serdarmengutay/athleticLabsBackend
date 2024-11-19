const Club = require("../models/Club");
const mongoose = require("mongoose");

// Yeni kulüp ekleme
exports.createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Kulüpleri listeleme
exports.getClubs = async (req, res) => {
  const clubs = await Club.find().populate("athletes");
  res.json(clubs);
};

// Kulüp güncelleme
exports.updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Kulüp silme
exports.deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Id'ye göre kulüp getirme
exports.getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    // String olarak arama
    const club = await Club.findOne({ _id: id }).populate("athletes");

    if (!club) {
      return res.status(404).json({ error: "Kulüp bulunamadı" });
    }

    res.json(club);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Hatalı ID veya başka bir problem: " + error.message });
  }
};
