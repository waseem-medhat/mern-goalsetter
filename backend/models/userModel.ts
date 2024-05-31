import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)
