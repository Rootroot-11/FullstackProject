const router = require('express').Router();
const commentController = require('../controllers/commentController');
const {authMiddleware} = require("../middlewares");

router.post(
    '/:_id',
    authMiddleware.checkIsUserAuthMiddleware,
    commentController.createComment
);

module.exports = router;
