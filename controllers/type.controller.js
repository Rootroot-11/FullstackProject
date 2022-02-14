const Type = require('../dataBase/Type');

module.exports = {
    createType: async (req, res, next) => {
        try {
            const {name} = req.body;

            const type = await Type.create({name});

            return res.json(type);
        } catch (e) {
            next(e);
        }
    },

    getAllType: async (req, res, next) => {
        try {
            const types = await Type.find({...req.type});

            res.json(types);
        } catch (e) {
            next(e);
        }
    }
};
