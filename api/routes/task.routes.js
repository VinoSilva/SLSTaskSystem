const express = require('express');
const router = express.Router();

//Require the task controller.
const taskController = require('../controller/task.controller');

router.post('/',taskController.createTask);
router.patch('/',taskController.updateTask);
router.delete('/',taskController.deleteTask);
router.get('/',taskController.getTask);

// router.patch('/logout',userController.updateTasks);

module.exports = router;