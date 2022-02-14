const {Schema, model} = require('mongoose');

const BrandSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        unique: true,
    }
});

module.exports = model('brand', BrandSchema);
