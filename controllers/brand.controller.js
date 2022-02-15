const Brand = require('../dataBase/Brand');

module.exports = {
    createBrand: async (req, res, next) => {
        try {
            const newBrand = await Brand.create({...req.body});

            res.json(newBrand);
        } catch (e) {
            next(e);
        }
    },

    getAllBrand: async (req, res, next) => {
        try {
            const brands = await Brand.find({...req.user});

            res.json(brands);
        } catch (e) {
            next(e);
        }
    },

    getBrandById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const brand = Brand.findById({id});

            res.json(brand);
        } catch (e) {
            next(e);
        }
    }

};
