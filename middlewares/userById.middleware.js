const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneUser = await User.findById(user_id).select('-password');

            if (!oneUser) {
                throw new ErrorHandler('Error not found');
            }
            req.user = oneUser;
            next();
        } catch (e) {
            next(e);
        }
    }

};
