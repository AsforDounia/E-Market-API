import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: [true, 'Username cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: [true, 'Email cannot be empty'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    deletedAt: { type: Date, default: null }
}, {
    collection: 'users',
    timestamps: true
});

export default mongoose.model('User', UserSchema);