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

    categories: [{
        name: String,
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    }],

    photo: {
        data: Buffer,
        contentType: String
    },

    quantity: {
        type: Number
    },

    shipping: {
        required: false,
        type: Boolean
    }

},  { timestamps: true })

 module.exports = mongoose.model("Product", productSchema)