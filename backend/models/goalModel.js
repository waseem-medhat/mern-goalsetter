const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)
