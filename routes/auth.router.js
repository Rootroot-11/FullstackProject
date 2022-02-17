const authController = require("../controllers/auth.controller");
const router = require('express').Router();

router.post('/registration',
    authController.registration
);

router.post('/login',
    authController.login
);

router.post('/logout',
    authController.logout
);

module.exports = router;
