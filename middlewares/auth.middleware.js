const {passwordService} = require("../service");

module.exports = {
    checkPassword: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {user} = req;

            await passwordService.compare(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    }
};
