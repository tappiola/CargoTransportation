const express = require('express');
const router = express.Router();

const userController = require('../controllers/users/user.controller');
const validate = require('../middlewares/validate');

router.get('/', userController.index);
router.post('/register', validate.register, userController.register);
router.post('/login', validate.login, userController.login);

module.exports = router;
