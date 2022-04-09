const Device = require('../dataBase/Device');

module.exports = {
    findDevices: async (query = {}) => {
        console.log('___________');
        console.log(query);
        console.log('__________');

        const {limit = 3, page = 1, sortBy = 'createdAt', order = 'asc', ...filters} = query;
        console.log(page);
        console.log(limit);
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

        const devices = await Device.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await Device.countDocuments(filterObject);

        return {
            data: devices,
            page,
            limit,
            count
        }
    }
}
