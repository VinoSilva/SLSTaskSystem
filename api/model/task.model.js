const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  status: { type: String, enum: ["In Progress", "Done", "Completed"] },
  ancestors: [],
  parent: mongoose.Schema.Types.ObjectId,
  created_at: Date,
  updated_at: Date
});

taskSchema.statics.createTask = function(task) {
  return new Promise((resolve, reject) => {

    let doc = new this({
      _id: task._id,
      name: task.name,
      status: task.status,
      description: task.description
    });

    doc
    .save()
    .then(result => {
    resolve(result);
    })
    .catch(err => {
    reject(err);
    });
  });
};

taskSchema.statics.createTaskWithParent = function(task) {
  return new Promise((resolve, reject) => {
      
    let doc = new this({
        _id: task._id,
        name: task.name,
        status: task.status,
        description: task.description,
        parent: task.parent,
        ancestors: task.ancestors
    });

    let ancestors = doc.ancestors;

    //Needs optimization for querying
    doc
    .save()
    .then(createResult => {

        this.model("Task").aggregate([
            {$match: {_id: {$in: ancestors}}},
            {$set: {"status":"In Progress"}}
        ])
        .exec((err,ancestorResult)=>{
            if(err){
                throw err;
            }

            resolve({
                ancestorResult,
                createResult
            });
      })

    })
    .catch(err => {
        reject(err);
    });

  });
};

taskSchema.statics.updateTask = function(task) {

  console.log(JSON.stringify(task));
  
  
  this.model("Task").aggregate([
    {$match: {_id: {$in: task.ancestors}}},
  ])
  .exec((err,result)=>{
    console.log(result);
  })

  return new Promise((resolve, reject) => {
    
    //Find the model and update it
    this.model("Task")
      .findOne({
        _id: task._id
      })
      .then(result => {

          Object.keys(task).forEach(element => {
              result[element] = task[element];
          });

          result.save()
          .then(newResult => {
            resolve(newResult);
          })
          .catch(err => {
            reject(err);
          })
          .catch(err => {
            reject(err);
          });
      });
})};

taskSchema.statics.deleteTask = function(task) {
  return new Promise((resolve, reject) => {
    this.model("Task")
      .deleteOne({
        _id: task._id
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
