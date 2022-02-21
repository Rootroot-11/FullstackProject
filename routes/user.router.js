const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const userMiddleware = require('../middlewares/user.middleware');
const userByIdMiddleware = require('../middlewares/userById.middleware');

router.get(
    '/',
    userController.getUsers);

router.get(
    '/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userController.getUsersById
);

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.createUserValidator),
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.updateUserValidator),
    userController.updateUser
);

router.delete(
    '/:user_id',
    userController.deleteUser
);

module.exports = router;
