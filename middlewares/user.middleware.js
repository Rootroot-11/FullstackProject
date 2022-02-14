const User = require('../dataBase/User');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if(error) {
                throw new ErrorHandler('bad request', 401);
            }

            req.user = value;
            next();
        } catch (e)  {
            next(e);
        }
    }
};
