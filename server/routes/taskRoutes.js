const express = require('express');
const router = express.Router();

const { serverworks } = require('../controllers/taskController');

router.get('/', serverworks)

module.exports = router;