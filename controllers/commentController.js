const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    createComment: async (req, res) => {
        const {rating, comment} = req.body;
        const device = await Device.findById(req.params._id);

        if (device) {
            const alreadyReviewed = device.reviews.find(
               (r) => r.user.toString() === req.user._id.toString()
            );
            if (alreadyReviewed) {
                throw new ErrorHandler("Product already reviewed", 400);
            }
            const review = {
                nick_name: req.user.nick_name,
                rating: Number(rating),
                comment,
                user: req.user._id
            };
        device.reviews.push(review);
        device.numberReviews = device.reviews.length;
        device.rating =
            device.reviews.reduce((acc, item) =>
                item.rating + acc,0) /
            device.reviews.length;

        await device.save();
        res.status(201).json({message: "Review added"});
        } else {
                throw new ErrorHandler("Product not found", 404)
            }
        }
}
