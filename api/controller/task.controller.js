const Task = require("../model/task.model");

exports.createTask = function(req, res) {
    
    // return res.status(200).json({
    //     success: "Success",
    //     task: {
    //         name: result.name,
    //         description: result.description,
    //         _id: result._id,
    //     }
    // });

};

exports.updateTask = function(req, res) {

    // res.status(200).json({
    //     success: "Success",
    //     task: {
    //         name: result.name,
    //         description: result.description,
    //         status: result.status,
    //         _id: result._id
    //     }

    // });
    // return res.status(500).json({
    //   fail: "Server error"
    // });

};

exports.deleteTask = function(req,res){

    // return res.status(200).json({
    //     success: "Success",
    // });

    // return res.status(500).json({
    //     fail: 'Server error'
    // });

}

exports.findTask = function(req,res){
    
    // return res.status(200).json({
    //     success: 'Success',
    //     task: {
    //         name: result.name,
    //         description: result.description,
    //         _id: result._id,
    //         status: result.status
    //     }
    // });
    // return res.status(404).json({
    //     fail: 'Fail'
    // });
    // return res.status(500).json({
    //     fail: 'Fail'
    // });

};

exports.findTasks = function(req,res){

    // return res.status(200).json({
    //     count: result.count,
    //     success: "Success",
    //     tasks: result.tasks,
    //     tasksPerPage: 20, //Use config to find out about this
    //     currentPage: req.body.skip
    // });

    // return res.status(404).json({
    //     fail: "Fail"
    // })

};