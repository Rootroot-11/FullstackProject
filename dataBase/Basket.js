const {Schema, model} = require('mongoose');

const basketSchema = new Schema({
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
    amount: {
        type: Number,
        required: true,
    },
    image: {
        type: Image,
        default: 'aashdsw.jpg'
    }

}, {timestamps: true});

module.exports = model('basket', basketSchema);
