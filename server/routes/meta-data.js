const express = require('express');
const metaDataController = require('../controllers/meta-data.js');

const router = express.Router();

router.get('/english-levels', metaDataController.getEnglishLevels);

module.exports = router;