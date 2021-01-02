const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');

router.get('/', userController.index);
router.post('/register', validate.register, userController.register);
router.post('/login', validate.login, userController.login);
router.delete('/', userController.delete);

module.exports = router;
