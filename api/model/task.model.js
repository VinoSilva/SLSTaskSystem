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
      _id: new mongoose.Types.ObjectId(),
      name: task.name,
      status: "In Progress",
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
        _id: new mongoose.Types.ObjectId(),
        name: task.name,
        status: "In Progress",
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

          result.updated_at = new Date();

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

taskSchema.statics.getTask = function(task){


  return new Promise((resolve,reject)=>{
    this.model("Task")
    .findOne(task) //Graph ql here
    .then((result)=>{
      
      resolve(result);

    })
    .catch((err)=>{
      console.log(err);
      
      reject(err);
    })
  });
}

taskSchema.statics.getTasks = function(body){
  return new Promise((resolve,reject)=>{

    this.model("Task")
    .aggregate([
        {$sort: {created_at: -1}},
        { $project: {name: 1,description: 1,_id: 1,status: 1}},
        { $skip: (body.skip*body.limit) },
        { $limit: body.limit}
    ])
    .exec((err,res)=>{

        if(err){
            throw err;
        }

        this.model("Task").countDocuments({

        })
        .then((result)=>{

            resolve({
              count: result,
              tasks: res
            });
            
        })
        .catch((err)=>{
            console.log(err);
            reject(err);
        })

    });
  });
}

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
