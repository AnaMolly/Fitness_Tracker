const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercises: [{
      type:{
        type: String,
        required: "Enter a type of workout please."
        },
      name: {
        type: String,
        trim: true,
        required: "Enter a name please."
        },
      duration: {
        type: Number,
      required: "Enter duration please."
        },
      weight: {
        type: Number
        },
      reps: {
        type: Number
        },
      sets: {
        type: Number
        },
      distance: {
        type: Number
        }
    }],
    day: {
      type: Date,
      default: Date.now
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
