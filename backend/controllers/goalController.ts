import asyncHandler from "express-async-handler"
import Goal from "../models/goalModel.js"
import User from "../models/userModel.js"

// @desc   Get goals
// @route  GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc   Set a goal
// @route  POST /api/goals
// @access Private
export const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc   Update a goal
// @route  PUT /api/goals/:id
// @access Private
export const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    if (!user) {
        res.status(401)
        throw new Error("Unauthorized! User not found")
    }

    if (goal && goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("Unauthorized user!")
    }

    const newGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(newGoal)
})

// @desc   Delete a goal
// @route  DELETE /api/goals/:id
// @access Private
export const deleteGoal = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error("No ID provided")
    }

    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("Unauthorized! User not found")
    }

    if (goal && goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("Unauthorized user!")
    }

    if (goal) {
        console.log(goal)
        await goal.deleteOne()
    }

    res.status(200).json({ message: "deleted" })
})
