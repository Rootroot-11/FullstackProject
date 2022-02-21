const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");
const {USER_NOT_FOUND} = require("../errors");

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {device_id} = req.params;
            const oneDevice = await Device.findById(device_id);

            if (!oneDevice) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
            }
            req.device = oneDevice;
            next();
        } catch (e) {
            next(e);
        }
    }

};
