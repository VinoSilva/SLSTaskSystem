const mongoose = require("mongoose");
const Task = require("../model/task.model");

var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Dependency task function", () => {

  before(function(done){

    let doc = {
        _id: new mongoose.Types.ObjectId(),
        name: "Zelda animation",
        description: "Zelda running animation",
        status: "In Progress"
    };

    Task.createTask(doc)
    .then((result)=>{

        result.should.not.equal(undefined);
        result.should.be.a("object");

        result.should.have.property("_id");
        result._id.should.not.equal(undefined);

        result.should.have.property("name");
        result.name.should.be.a("string");
        result.name.should.be.equal(doc.name);

        result.should.have.property("status");
        result.status.should.be.a("string");
        result.status.should.be.equal(doc.status);

        result.should.have.property("description");
        result.description.should.be.a("string");
        result.description.should.be.equal(doc.description);

        this.ancestorTask = result;

        done();

    })
    .catch((err)=>{
        throw err;
    })
  });

  // it("It should create nested task and update the parent task", function(done) {

  //   let taskDoc = {
  //       _id: new mongoose.Types.ObjectId(),
  //       name: "Zelda Leg Model",
  //       status: "In Progress",
  //       description: "Zelda Leg Model",
  //       parent: this.ancestorTask._id,
  //       ancestors: []
  //   };

  //   taskDoc.ancestors.push(this.ancestorTask._id);

  //   Task.createTaskWithParent(taskDoc)
  //   .then(result=>{

  //       result.should.not.equal(undefined);
  //       result.should.be.a("object");

  //       result.should.have.property('createResult');
  //       result.createResult.should.be.a('object');
  //       result.createResult.should.not.equal(undefined);
         
  //       result.should.have.property('createResult');
  //       result.createResult.should.be.a('object');
  //       result.createResult.should.not.equal(undefined);

  //       result.createResult.should.have.property("_id");
  //       result.createResult._id.should.be.a('object');
  //       mongoose.Types.ObjectId.isValid(taskDoc._id).should.equal(true);
  //       result.createResult._id.should.equal(taskDoc._id);

  //       result.createResult.should.have.property("name");
  //       result.createResult.name.should.be.a('string');
  //       result.createResult.name.should.equal(taskDoc.name);

  //       result.createResult.should.have.property("status");
  //       result.createResult.status.should.be.a('string');
  //       result.createResult.status.should.equal(taskDoc.status);

  //       result.createResult.should.have.property("description");
  //       result.createResult.description.should.be.a('string');
  //       result.createResult.description.should.equal(taskDoc.description);

  //       result.createResult.should.have.property("parent");
  //       result.createResult._id.should.be.a('object');
  //       mongoose.Types.ObjectId.isValid(taskDoc._id).should.equal(true);
  //       result.createResult.parent.should.equal(taskDoc.parent);

  //       result.should.have.property('ancestorResult');
  //       result.ancestorResult.should.not.be.equal(undefined);
  //       result.ancestorResult.should.be.a("array");

  //       result.ancestorResult[0].should.have.property("_id");
  //       result.ancestorResult[0]._id.should.be.a("object");
  //       mongoose.Types.ObjectId.isValid(result.ancestorResult[0]._id).should.equal(true);

  //       result.ancestorResult[0].should.have.property("description");
  //       result.ancestorResult[0].description.should.be.a("string");
  //       result.ancestorResult[0].description.should.equal(this.ancestorTask.description);

  //       result.ancestorResult[0].should.have.property("status");
  //       result.ancestorResult[0].status.should.be.a("string");
  //       result.ancestorResult[0].status.should.equal("In Progress");

  //       result.ancestorResult[0].should.have.property("name");
  //       result.ancestorResult[0].name.should.be.a("string");
  //       result.ancestorResult[0].name.should.equal(this.ancestorTask.name);

  //       result.ancestorResult[0].should.have.property("ancestors");
  //       result.ancestorResult[0].ancestors.should.be.a("array");
  //       result.ancestorResult[0].ancestors.should.have.length(0);

  //       this.childTask = result.createResult;

  //       done();

  //   })
  //   .catch((err)=>{
  //       throw(err);
  //   });

  // });

  // it('It should update the childTask to complete and update all ancestors with completed child tasks to complete', function(done){
    
  // Task.updateTask({
  //     _id: this.childTask._id,
  //     name: 'New Name',
  //     ancestors: this.childTask.ancestors
  //   })
  //   .then((result)=>{
  //     done();
  //   })
  //   .catch((err)=>{
  //     throw err;
  //   });
  // });

  // after(function(done) {
  //   this.dropDatabase(done);
  // });

});
