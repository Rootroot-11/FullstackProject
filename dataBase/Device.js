const {Schema, model} = require('mongoose');

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        default: -12,
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
}, {timestamps: true});

module.exports = model('device', deviceSchema);
