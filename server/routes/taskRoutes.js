const express = require('express');
const router = express.Router();

const { serverworks, createtask, getalltasks, completetask, updatetask, deletetask } = require('../controllers/taskController');

router.get('/', serverworks)
router.post('/add', createtask)
router.get('/getall', getalltasks)
router.post('/completion', completetask)
router.post('/update', updatetask)
router.post('/delete', deletetask)

module.exports = router;