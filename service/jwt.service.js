const jwt = require('jsonwebtoken');

const {ErrorHandler} = require('../errors/ErrorHandler');
const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, ACCESS} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY,{ expiresIn:'30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretWord = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
