const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc   Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc   Set a goal
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text")
    }

    const goal = await Goal.create({ text: req.body.text })

    res.status(200).json(goal)
})

// @desc   Update a goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    const newGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(newGoal)
})

// @desc   Delete a goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error("No ID provided")
    }

    const deleteRes = await Goal.findByIdAndDelete(req.params.id)
    
    res.status(200).json(deleteRes)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
