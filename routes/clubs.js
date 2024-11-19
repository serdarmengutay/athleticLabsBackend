const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

router.get("/", clubController.getClubs);
router.post("/", clubController.createClub);
router.put("/:id", clubController.updateClub);
router.delete("/:id", clubController.deleteClub);
router.get("/:id", clubController.getClubById);

module.exports = router;
