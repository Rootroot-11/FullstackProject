const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    nameOfProduct: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        default: "We don't have information about this product. You can ask us on facebook."
    },
    statusOfOrder: {
        type: String,
        required: true,
        trim: true,
        default: "Your order in the way"
    },
    price: {
        type: Number,
        required: true
    },
    nameOfUser: {
        type: String,
        required: true
    },
    emailOfUser: {
        type: String,
    }

});

