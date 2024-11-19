const express = require("express");
const router = express.Router();
const athleteController = require("../controllers/athleteController");

router.get("/", athleteController.getAthletes);
router.post("/", athleteController.createAthlete);
router.put("/:id", athleteController.updateAthlete);
router.delete("/:id", athleteController.deleteAthlete);

module.exports = router;
