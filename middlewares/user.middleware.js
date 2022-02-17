const User = require('../dataBase/User');
const {ErrorHandler, BAD_REQUEST} = require("../errors");

module.exports = {
    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if(error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST.status);
            }

            req.user = value;
            next();
        } catch (e)  {
            next(e);
        }
    }
};
