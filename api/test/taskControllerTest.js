const mongoose = require("mongoose");
const Task = require("../model/task.model");

var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Task Controller test", () => {

  before(function(done){
    done();
  });

  it("It should create a new task", function(done) {

    let taskData = {
        name: "Legend Of Zelda Concept Art",
        description: "Legend Of Zelda"
    };

    chai.request("http://localhost:4000")
    .post('/task/')
    .send(taskData)
    .end((err,res)=>{

        if(err){
            console.log(err);
            throw err;
        }

        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a("object");

        res.body.should.have.property("task");
        res.body.task.should.be.a("object");

        res.body.task.should.have.property("name");
        res.body.task.name.should.be.a("String");
        res.body.task.name.should.equal(taskData.name);

        res.body.task.should.have.property("description");
        res.body.task.description.should.be.a("String");
        res.body.task.description.should.equal(taskData.description);

        res.body.should.have.property("success");
        res.body.success.should.equal("Success");

        this.task = res.body.task;

        done();
    });
  });

  it("It should update the task", function(done){

    let taskData = {
        name: "Legend Of Zelda Concept Art",
        description: "Legend Of Zelda",
        _id: this.task._id
    };

    chai.request("http://localhost:4000")
    .patch('/task/')
    .send(taskData)
    .end(function(err,res){

        if(err){
            console.log(err);
            throw err;
        }

        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a("object");

        res.body.should.have.property("task");
        res.body.task.should.be.a("object");

        res.body.task.should.have.property("name");
        res.body.task.name.should.be.a("String");
        res.body.task.name.should.equal(taskData.name);

        res.body.task.should.have.property("description");
        res.body.task.description.should.be.a("String");
        res.body.task.description.should.equal(taskData.description);

        res.body.should.have.property("success");
        res.body.success.should.equal("Success");

        this.task = res.body.task;

        done();
    });
  });

  it("It should delete the task", function(done){
    
    let taskData = {
        name: "Legend Of Zelda Concept Art",
        description: "Legend Of Zelda",
        _id: this.task._id
    };

    chai.request("http://localhost:4000")
    .patch('/task/')
    .send(taskData)
    .end(function(err,res){

        if(err){
            console.log(err);
            throw err;
        }

        res.should.not.equal(undefined);
        
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a("object");

        res.body.should.have.property("success");
        res.body.success.should.equal("Success");

        done();

    });

  });

  it('It gets the task searched for ', function(done){


    chai.request("http://localhost:4000")
    .get('/task/')
    .send({_id: this.task._id})
    .end(function(err,res){
        
        res.should.not.equal(undefined);
        
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a("object");
    
        res.should.have.property("body");
        
        res.body.should.not.equal(undefined);
        res.body.should.be.a("Object");
    
        res.body.task.should.have.property("name");
        res.body.task.name.should.be.a("String");
        res.body.task.name.should.be.equal(this.task.name);
    
        res.body.task.should.have.property("description");
        res.body.task.description.should.be.a("String");
        res.body.task.description.should.be.equal(this.task.description);

        done();
    })

  });

  after(function(done) {
    
    this.task = null;

    this.dropDatabase(done);

  });

});
