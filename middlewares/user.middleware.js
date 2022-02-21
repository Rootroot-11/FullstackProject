const User = require('../dataBase/User');
const {ErrorHandler, BAD_REQUEST} = require("../errors");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if(userByEmail) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST.status);
            }

            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
