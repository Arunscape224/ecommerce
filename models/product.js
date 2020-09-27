import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },

    vendor: {
        type: String,
        trim: true,
        maxlength: 32
    },

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    sfPerBox: {
        type: Number,
        // required: true
    },


    sfPerPiece: {
        type: Number,
        // required: true
    },

    pcPerBox: {
        type: Number,
        // required: true
    },


    price: {
        type: Number,
        trim: true, 
        required: true
    },
    
    photo: {
        data: Buffer,
        contentType: String
    },

    installShot: {
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

    description: {
        type: String,
        trim: true,
        maxlength: 32
    },

    soldPer: {
        default: "sf",
        type: String
    },

    weight: {
        default: 0,
        type: Number
    },
    
    color: {
        type: String,
        trim: true,
        // required: true, 
        maxlength: 32
    },

    finish: {
        type: String,
        trim: true,
        // required: true,
        maxlength: 32
    },

    size: {
        type: String,
        trim: true,
        // required: true,
        maxlength: 32
    },

    thickness: {
        type: String,
        trim: true,
        // required: true,
        maxlength: 32
    },

    shadeVariation: {
        type: String,
        trim: true,
        // required: true,
        maxlength: 32
    },

    shipping: {
        required: false,
        type: Boolean
    },

    materialType: {
        type: String,
        required: true,
        trim: true
    },

    style: {
        type: String,
        trim: true
    },

    variants: {
        type: Array,
        default: []
    }

},  { timestamps: true })

 module.exports = mongoose.model("Product", productSchema)