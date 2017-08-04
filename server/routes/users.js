const express = require('express');
const validate = require('express-validation');
const validation = require('../validation/users');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('', validate(validation.users), usersController.get);

module.exports = router;
