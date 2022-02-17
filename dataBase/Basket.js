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

}, {timestamps: true});

module.exports = model('basket', basketSchema);
