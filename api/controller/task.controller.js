const Task = require("../model/task.model");
const mongoose = require("mongoose");

exports.createTask = function(req, res) {
    
    Task.createTask(req.body)
    .then((result)=>{
        return res.status(200).json({
            success: "Success",
            task: {
                name: result.name,
                description: result.description,
                _id: result._id,
            }
        });
    })
    .catch((err)=>{

        console.log(err);

        return res.status(500).json({
          fail: "Server error"
        });
    });
};

exports.updateTask = function(req, res) {
    Task.updateTask(req.body)
    .then((result)=>{
        return res.status(200).json({
            success: "Success",
            task: {
                name: result.name,
                description: result.description,
                _id: result._id
            }
        });
    })
    .catch((err)=>{

        console.log(err);

        return res.status(500).json({
          fail: "Server error"
        });
    });
};

exports.deleteTask = function(req,res){
    Task.deleteTask(req.body)
    .then((result)=>{
        return res.status(200).json({
            success: "Success",
        });
    })
    .catch((err)=>{
        console.log(err);

        return res.status(500).json({
            fail: 'Server error'
        });
    });
}

exports.getTask = function(req,res){
    Task
    .getTask(req.body)
    .then((result)=>{

        if(result){
            return res.status(200).json({
                success: 'Success',
                task: {
                    name: result.name,
                    description: result.description,
                    _id: result._id
                }
            });
        }
        else{
            return res.status(404).json({
                fail: 'Fail'
            });
        }

    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).json({
            fail: 'Fail'
        });
    })
};

exports.getTasks = function(req,res){



    Task.getTasks(req.body)
    .then((result)=>{

        return res.status(200).json({
            count: result.count,
            success: "Success",
            tasks: result.tasks,
            tasksPerPage: 20, //Use config to find out about this
            currentPage: req.body.skip
        });
    })
    .catch((err)=>{
        console.log(err);
        
        return res.status(404).json({
            fail: "Fail"
        })
    })
};