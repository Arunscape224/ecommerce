import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    products: {
        type: Array,
        default: []
    },
    
    photo: {
        data: Buffer,
        contentType: String
    }

},  { timestamps: true })

 module.exports = mongoose.model("Category", categorySchema)