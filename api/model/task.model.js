const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: String,
  description: String,
  name: {type: String, enum: ['In Progress', 'Done', 'Completed']},
  dependentTask: [taskSchema],
  parentTask: mongoose.Schema.Types.ObjectId
});

taskSchema.statics.createTask = function(task){
    return new Promise((resolve,reject)=>{
    
        let doc = new this({
            _id: task._id,
            name: task.name,
            status: task.status,
            description: task.description
        });
        
        doc.save()
        .then((result)=>{
            resolve(result);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}

taskSchema.statics.updateTask = function(task){
    return new Promise((resolve,reject)=>{
        this.model("Task").findOne({
            _id: task._id
        })
        .then((result)=>{

            Object.keys(task).forEach(element => {
                result[element] = task[element];
            });

            result.save()
            .then((newResult)=>{
                resolve(newResult);
            })
            .catch((err)=>{
                reject(err);
            });

        })
        .catch((err)=>{
            reject(err);
        });
    });
}

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);