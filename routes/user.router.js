const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const userMiddleware = require('../middlewares/user.middleware');
const userByIdMiddleware = require('../middlewares/userById.middleware');
const {authMiddleware} = require("../middlewares");
const {ADMIN, VIEWER} = require("../configs/user-roles.enum");

router.get(
    '/',
    // userMiddleware.checkUserRole(ADMIN, VIEWER),
    userController.getUsers);

router.get(
    '/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    userMiddleware.checkUserRole(VIEWER),
    userController.getUsersById
);

router.post(
    '/registration',
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
    userMiddleware.checkUserRole(ADMIN),
    userController.deleteUser
);

module.exports = router;
