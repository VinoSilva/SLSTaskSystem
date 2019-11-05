const express = require('express');
const router = express.Router();

//Require the task controller.
const userController = require('../controller/task.controller');

router.post('/',userController.createTask);
router.patch('/logout',userController.updateTasks);

module.exports = router;