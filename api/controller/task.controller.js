var models = require('../model/index');


const realtime = require('../utilities/realtime');

exports.createTask = function(req, res) {

    let createData = req.body;

    createData.status = "In Progress";

    models.task.create(createData)
    .then((task)=>{
        res.status(200).json({
            success: "Successfully created task",
            task 
        });
    })
    .catch((err)=>{
        res.status(500).json({
            failure: "Failed to create task"
        });
    });
};

exports.updateTask = function(req, res) {
    

    //Move this code into the model class function
    models.task.findOne({where: {id:req.body.id}})
    .then((task)=>{

        let data = req.body;


        Object.keys(data).forEach((field)=>{
            if(task[field] !== data[field]){
                task[field] = data[field];
            }
        });

        task.save()
        .then((updatedTask)=>{
            let plain = updatedTask.get({plain: true});

            realtime.connection().sendEvent(plain.id,{
                name: plain.name,
                description: plain.description,
                status: plain.status 
            });
            
            res.status(200).json({
                success: "Successfully updated task",
                task: plain
            });
        })
        .catch((err)=>{
            console.log(err);
        });

    })
    .catch((err)=>{
        res.status(500).json({
            failure: "Failed to update task",
        });
    });
};

exports.deleteTask = function(req,res){

    // return res.status(200).json({
    //     success: "Success",
    // });

    // return res.status(500).json({
    //     fail: 'Server error'
    // });

    models.task.destroy(
        {where: {id: req.body.id}}
    )
    .then((data)=>{

        return res.status(200).json({
            success: 'Successfully deleted a task'
        });
    })
    .catch((err)=>{
    
        console.log(err);
    
        return res.status(500).json({
            failure: 'Failure to delete a task'
        });

    });

}

exports.findTask = function(req,res){

    let failureJson = {
        failure: 'Could not find a task'
    };

    
    
    models.task.findOne({where: {id: req.body.id}})
    .then((task)=>{
        
        if(task){
            
            res.status(200).json({
                success: 'Successfully found the task',
                task
            });
        }
        else{
            res.status(500).json(failureJson);
        }
    })
    .catch((err)=>{
        res.status(500).json(failureJson);
    });
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

    models.task.findAndCountAll ({limit:req.body.limit,skip:req.body.skip,raw: true})
    .then((result)=>{
        
        return res.status(200).json({
            success: 'Successfully found tasks',
            tasks: result,
            tasksPerPage: 20,
            currentPage: req.body.skip
        });
    })
    .catch((err)=>{
        console.log(err);

        res.status(500).json({
            failure: 'Failure'
        });
    });
};