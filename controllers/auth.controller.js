const jwtService = require('../service/jwt.service');
const O_Auth = require('../dataBase/O_Auth');
const userUtil = require("../utils/user.util");

module.exports = {
    // registration: async (req, res, next) => {
    //     try {
    //       const {email} = req.body;
    //
    //       const user = User.findOne({email});
    //
    //       if(!user) {
    //           throw new ErrorHandler(USER_NOT_FOUND.message);
    //       }
    //
    //       const tokens = tokenizer();
    //
    //       res.json(tokens);
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    login: async (req, res, next) => {
        try {
            const {user} = req;
            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userUtil.userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id});

            res.json({
                user: userNormalized,
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

