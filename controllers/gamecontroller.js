const router = require("express").Router();
const Game = require("../db").import("../models/game");

router.get("/all", async (req, res) => {
  const games = await Game.findAll({ where: { owner_id: req.user.id } });
  if (games) {
    res.status(200).json({ games, message: "Data fetched." });
  } else {
    res.status(500).json({ message: "Data not found" });
  }
});

router.get("/:id", async (req, res) => {
  const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
  if (game) {
    res.status(200).json({ game });
  } else {
    res.status(500).json({ message: "Data not found." });
  }
});

router.post("/create", async (req, res) => {
  const game = await Game.create({
    title: req.body.game.title,
    owner_id: req.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played
  });
  if (game) {
    res.status(200).json({ game, message: "Game created." });
  } else {
    res.status(500).json({ error: "Error while creating new game" });
  }
});

router.put("/update/:id", async (req, res) => {
  const game = await Game.update({
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.user.id
      }
    });
  if (game) {
    res.status(200).json({ game, message: "Successfully updated." });
  } else {
    res.status(500).json({ error: "Error while updating game" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const game = await Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id
    }
  });
  if (game) {
    res.status(200).json({ game, message: "Successfully deleted" });
  } else {
    res.status(500).json({ error: "Error while deleting game" });
  }
});

module.exports = router;