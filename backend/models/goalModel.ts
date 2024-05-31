import mongoose, { Schema, Document } from "mongoose"

interface IGoal extends Document {
    user: Schema.Types.ObjectId
    text: String
    createdAt: Date
    updatedAt: Date
}

const goalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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

export default mongoose.model<IGoal>('Goal', goalSchema)
