const Device = require('../dataBase/Device');
const {POST_DEVICE, UPDATE} = require("../configs/email-action.enum");
const {emailService, deviceService} = require("../service");
const {USER_DELETE} = require("../errors");

module.exports = {
    getAllDevices: async (req, res, next) => {
        try {
            const devices = await deviceService.findDevices(req.query);

            res.json(devices);
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

            await Device.findByIdAndDelete(device_id);

            res.json(USER_DELETE.message, USER_DELETE.status);
        } catch (e) {
            next(e);
        }
    }
};

