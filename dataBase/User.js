const {Schema, model} = require('mongoose');
const userRolesEnum = require('../configs/user-roles.enum');

const userSchema = new Schema({
    nick_name: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: String,
        default: userRolesEnum.VIEWER,
        enum: Object.values(userRolesEnum)
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
