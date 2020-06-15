import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    products: [{
        name: String,
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    
    photo: {
        data: Buffer,
        contentType: String
    }

},  { timestamps: true })

 module.exports = mongoose.model("Category", categorySchema)