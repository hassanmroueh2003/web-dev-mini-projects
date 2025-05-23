const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {

    const workouts = await Workout.find({}).sort({createdAt: -1});

    res.status(200).json({workouts});
}

//get single workout

const getWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json({workout});

}

//create new workout
const createWorkout = async (req, res) => {
    //check if all required fields are present
    if (!req.body.title || !req.body.reps || !req.body.load) {
        return res.status(400).json({error: 'All fields are required'});
    }
    const {title, reps, load} = req.body;
    //add doc to db
    try {
        const workout =  await Workout.create({title, reps, load});
        workout.save();
        res.status(200).json({workout});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Could not create workout'});
        res.status(400).json({error: error.message});

    }
}
//delete workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findByIdAndDelete({_id: id});

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json({workout});


}
//update workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    res.status(200).json({workout});
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};