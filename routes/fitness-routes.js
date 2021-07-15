const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");


router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.put("/api/workouts/:id", ({ params, body }, res) => {

  Workout.findByIdAndUpdate(params.id , { $push: { exercises: body }})
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => res.status(400).json( err))
});


module.exports = router