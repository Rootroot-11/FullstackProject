const {Schema, model} = require('mongoose');

const TypeSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        unique: true,
    }
});

module.exports = model('type', TypeSchema);

