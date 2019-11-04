const express = require('express');
const router = express.Router();

//Require the task controller.
const userController = require('../controller/task.controller');

router.post('/',userController.createTask);
// router.get('/logout',userController.logout);

module.exports = router;