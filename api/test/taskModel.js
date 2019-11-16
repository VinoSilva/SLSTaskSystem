const mongoose = require("mongoose");
const Task = require("../model/task.model");

var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Test task function", () => {
  it("It should create a new task", function(done) {
    let taskDoc = {
      _id: new mongoose.Types.ObjectId(),
      name: "Finish water shader",
      status: "In Progress",
      description: "Make realistic water shader for the ocean."
    };

    Task.createTask(taskDoc)
      .then(result => {
        result.should.not.equal(undefined);
        result.should.be.a("object");

        result.should.have.property("_id");
        result._id.should.not.equal(undefined);

        result.should.have.property("name");
        result.name.should.be.a("string");
        result.name.should.be.equal(taskDoc.name);

        result.should.have.property("status");
        result.status.should.be.a("string");
        result.status.should.be.equal(taskDoc.status);

        result.should.have.property("description");
        result.description.should.be.a("string");
        result.description.should.be.equal(taskDoc.description);

        this.task = result;

        done();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  });

  it("It should update the task", function(done) {
    let taskDoc = this.task;

    taskDoc.name = "Lava Shader";
    taskDoc.description = "Make lava shader for lava level";

    Task.updateTask(taskDoc)
      .then(result => {
        result.should.not.equal(undefined);
        result.should.be.a("object");

        result.should.have.property("_id");
        result._id.should.not.equal(undefined);

        result.should.have.property("name");
        result.name.should.be.a("string");
        result.name.should.be.equal(taskDoc.name);

        result.should.have.property("status");
        result.status.should.be.a("string");
        result.status.should.be.equal(taskDoc.status);

        result.should.have.property("description");
        result.description.should.be.a("string");
        result.description.should.be.equal(taskDoc.description);

        done();
      })
      .catch(err => {
        throw err;
      });
  });

  it("It should delete a task", function(done) {
    let taskDoc = this.task;

    Task.deleteTask(taskDoc)
      .then(result => {
        result.should.not.equal(undefined);

        result.should.have.property("n");
        result.n.should.be.a("Number");
        result.n.should.be.equal(1);

        result.should.have.property("ok");
        result.ok.should.be.a("Number");
        result.ok.should.be.equal(1);

        result.should.have.property("deletedCount");
        result.deletedCount.should.be.a("Number");
        result.deletedCount.should.be.equal(1);

        this.task = null;

        done();
      })
      .catch(err => {
        throw err;
      });

    after(function(done) {
      this.dropDatabase(done);
    });
  });
});
