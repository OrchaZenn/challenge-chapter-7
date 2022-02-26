const LoginController = require('../controller/login');
const router = require('express').Router();

router.get('/signin', LoginController.index);
router.post('/signin', LoginController.auth);

module.exports = router;