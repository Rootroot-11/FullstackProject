const Device = require('../dataBase/Device');

module.exports = {
    getAllDevice: async (req, res, next) => {
        try {
            const {limit = 20, page = 1, ...filters} = req.query;
            const skip = (page - 1) * limit;
            const keys = Object.keys(filters);
            const filterObject = {};

            keys.forEach((key) => {
                switch (key) {
                    case 'priceGte':
                        filterObject.price = Object.assign({}, filterObject.price, {$gte: filters.priceGte});
                        break;
                    case 'priceLte':
                        filterObject.price = Object.assign({}, filterObject.price, {$lte: filters.priceLte});
                        break;
                    case 'name':
                        filterObject.name = { $regex: filters.name, $options: 'i'};
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
            const {} = req.body;
            // const {img} = req.files;
            // let filename = uuid.v4() + ".jpg"
            // img.mv(path.resolve(__dirname, '--', 'static', filename))

            //img get from s3 AWS
            const newDevice = await Device.create({...req.body});

            res.json(newDevice);
        } catch (e) {
            next(e);
        }
    },

    updateDevice: async (req, res, next) => {
        try {
            const {device_id} = req.params;

            const newDevice = await Device.findByIdAndUpdate(device_id);

            res.json(newDevice);
        } catch (e) {
            next(e);
        }
    },

    deleteDevice: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            Device.findByIdAndDelete(user_id);

            res.json('Device is deleted');
        } catch (e) {
            next(e);
        }
    }
};

