const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const reviewSchema = new Schema({
    nick_name: {
       type: String,
       required: true
   },
    rating: {
     type: Number,
     required: true
    },
    comment: {
       type: String,
        required: true
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    }
});

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [
        reviewSchema
    ],
    numberReviews: {
        type: Number,
        require: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    statusOnMagazine: {
        type: Boolean,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
}, {timestamps: true});

module.exports = model('device', deviceSchema);
