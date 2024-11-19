const Athlete = require("../models/Athlete");
const Club = require("../models/Club");

// Yeni sporcu ekleme ve bir kulübe atama
exports.createAthlete = async (req, res) => {
  try {
    const athlete = new Athlete(req.body);
    await athlete.save();

    // Sporcu eklenen kulübün 'athletes' listesine sporcu ID'sini ekleyin
    await Club.findByIdAndUpdate(req.body.clubId, {
      $push: { athletes: athlete._id },
    });

    res.status(201).json(athlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sporcuları listeleme
exports.getAthletes = async (req, res) => {
  const athletes = await Athlete.find();
  res.json(athletes);
};

// Sporcuyu güncelleme
exports.updateAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(athlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sporcuyu silme ve kulüpten kaldırma
exports.deleteAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findByIdAndDelete(req.params.id);
    if (athlete) {
      await Club.updateMany(
        { athletes: athlete._id },
        { $pull: { athletes: athlete._id } }
      );
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
