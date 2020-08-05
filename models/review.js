import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    userName: {
        type: String,
        required: true,
        trim: true
    },

    userTrade: {
        type: String,
        required: true,
        trim: true
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    textBody: {
        type: String,
        required: true,
        trim: true
    },
    

    rating: {
        type: Number,
        required: true
    },

    createdAt: { type: Date, default: Date.now }
    
},  { timestamps: true })

 module.exports = mongoose.model("Review", reviewSchema)