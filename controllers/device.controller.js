const Device = require('../dataBase/Device');
const {WELCOME, POST_DEVICE, UPDATE} = require("../configs/email-action.enum");
const {emailService} = require("../service");

module.exports = {
    getAllDevice: async (req, res, next) => {
        try {
            const {limit = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters} = req.query;
            const skip = (page - 1) * limit;
            const keys = Object.keys(filters);
            const filterObject = {};
            const orderBy = order === 'asc' ? -1 : 1;
            const sort = {[sortBy]: orderBy};

            keys.forEach((key) => {
                switch (key) {
                    case 'priceGte':
                        filterObject.price = Object.assign({}, filterObject.price, {$gte: filters.priceGte});
                        break;
                    case 'priceLte':
                        filterObject.price = Object.assign({}, filterObject.price, {$lte: filters.priceLte});
                        break;
                    case 'name':
                        filterObject.name = {$regex: filters.name, $options: 'i'};
                        break;
                    default:
                        filterObject[key] = filters[key];
                }
            });

            const oneDevice = await Device.find(filterObject).limit(limit).skip(skip);

            res.json(oneDevice);
        } catch (e) {
            next(e);
        }
    },

    getDeviceById: async (req, res, next) => {
        try {
            const {device} = req;

            res.json(device);
        } catch (e) {
            next(e);
        }
    },

    createDevice: async (req, res, next) => {
        try {
            const {email, name, price, brand} = req.body;

            //img get from s3 AWS
            const newDevice = await Device.create({...req.body});

            await emailService.sendMail(email, POST_DEVICE, {name, price, brand})
            res.json(newDevice);
        } catch (e) {
            next(e);
        }
    },

    updateDevice: async (req, res, next) => {
        try {
            const {device_id, price} = req.params;

            const device = await Device.findByIdAndUpdate(device_id, req.body, {new: true}).lean();

            await emailService.sendMail(device.email, UPDATE, {deviceName: device.name, price});

            res.json(device);
        } catch (e) {
            next(e);
        }
    },

    deleteDevice: async (req, res, next) => {
        try {
            const {device_id} = req.params;

            const deletedDevice = await Device.findByIdAndDelete(device_id);

            res.json(deletedDevice);
        } catch (e) {
            next(e);
        }
    }
};

