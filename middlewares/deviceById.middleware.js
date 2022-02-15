const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const oneDevice = await Device.findById(user_id);

            if (!oneDevice) {
                throw new ErrorHandler('not found');
            }
            req.device = oneDevice;
            next();
        } catch (e) {
            next(e);
        }
    }

};
