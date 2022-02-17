const jwtService = require('../service/jwt.service');
const O_Auth = require('../dataBase/O_Auth');
const userUtil = require("../utils/user.util");

module.exports = {
    registration: async (req, res, next) => {
        try {


        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const user = req.user;
            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userUtil.userNormalizator(user);
            await O_Auth.create({...tokenPair, user_id: normalizedUser._id});

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {token} = req;

            await O_Auth.deleteOne({access_token: token});

            res.json('You are logout');
        } catch (e) {
            next(e);
        }
    }
};
