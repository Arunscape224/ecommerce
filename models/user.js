import mongoose from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    specifier: {
        type: Boolean,
        required: true,
        default: false
    },

    trade: {
        type: String,
        trim: true,
        maxlength: 32
    },

    company: {
        type: String,
        trim: true,
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    hashed_password: {
        type: String,
        required: true,
    },

    salt: String,

    bio: {
        type: String,
        trim: true,
        maxlength: 100
    },

    admin: {
        type: Boolean,
        default: false
    },

    history: {
        type: Array,
        default: []
    },

    wishlist: {
        type: Array,
        default: []
    },

    photo: {
        data: Buffer,
        contentType: String
    }

},  { timestamps: true })

/* 

We need to utilize "virtual fields"
to be able to encrypt our password from
the client and then store it in the db.

 */ 

 userSchema.virtual('password')
 .set(function (password) {
     this._password = password
     this.salt = uuidv1()
     this.hashed_password = this.encryptPassword(password)
 })
 .get(() => {
     return this._password
 })

 userSchema.methods = {

    encryptPassword: function (password) {
        if(!password) return '';

        try {
            return crypto.createHmac('sha1', this.salt)
                                    .update(password)
                                    .digest('hex')
        } catch (err) {
            return '';
        }
         
    },

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    } 
 }

 module.exports = mongoose.model("User", userSchema);

 