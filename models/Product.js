const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: [true, 'Title cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: [true, 'Description cannot be empty']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative']
    },
    imageUrl: {
        type: String,
        default: ''
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    collection: 'products',
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
