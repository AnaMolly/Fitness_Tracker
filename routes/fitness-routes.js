const router = require("express").Router();
const Workout = require("../models/workout");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
          totalDuration: {
              $sum: '$exercises.duration'
          },
      },
    },
  ])
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
});

router.get(`/api/workouts/range`, (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
            { $sum: '$exercises.duration' }
        }
    }
  ])
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
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