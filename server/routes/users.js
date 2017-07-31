const express = require('express');
const validate = require('express-validation');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('', usersController.get);

module.exports = router;
