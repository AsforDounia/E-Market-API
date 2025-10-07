import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
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
        // enum: ['user', 'admin'], return msg
        enum: { values: ['user', 'admin'], message: 'Role must be either user or admin' },

        default: 'user'
    },
    deletedAt: { type: Date, default: null }
}, {
    collection: 'users',
    timestamps: true
});

export default mongoose.model('User', UserSchema);