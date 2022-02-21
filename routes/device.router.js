const router = require('express').Router();
const deviceController = require('../controllers/device.controller');
const deviceMiddleware = require('../middlewares/device.middleware');
const deviceByIdMiddleware = require('../middlewares/deviceById.middleware');

router.get('/',
    deviceController.getAllDevice);

router.get('/:user_id',
    deviceByIdMiddleware.checkIdMiddleware,
    deviceController.getDeviceById
);

router.post(
    '/',
    deviceMiddleware.isDeviceBodyValid,
    deviceMiddleware.createDeviceMiddleware,
    deviceController.createDevice
);

// router.put('/:device_id',
//     deviceController.
// );

router.delete(
    '/:device_id',
    deviceController.deleteDevice
);

module.exports = router;
