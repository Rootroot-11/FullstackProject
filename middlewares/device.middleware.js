const Device = require('../dataBase/Device');
const deviceValidator = require('../validators/device.validator');

module.exports = {
    createDeviceMiddleware: async (req, res, next) => {
        try {
            const {id} = req.body;
            const deviceById = Device.findOne({id});
            if (deviceById) {
                throw new Error('Id already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDeviceBodyValid: async (req, res, next) => {
        try {
            const {error, value} = deviceValidator.createDeviceValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

};
