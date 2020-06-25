import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    price: {
        type: Number,
        trim: true, 
        required: true
    },

    categories: {
        type: Array,
        default: []
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    quantity: {
        type: Number
    },

    howManySold: {
        default: 0,
        type: Number
    },

    shipping: {
        required: false,
        type: Boolean
    },

},  { timestamps: true })

 module.exports = mongoose.model("Product", productSchema)