const express = require('express');
const router = express.Router();

const { chat, subtasks, categorize } = require('../controllers/gptController');

router.post('/assistant-chat', chat)
router.post('/subtasks', subtasks)
router.post('/categorize', categorize)

module.exports = router;