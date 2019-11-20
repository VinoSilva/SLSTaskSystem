const mongoose = require("mongoose");
const Task = require("../model/task.model");

var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

const fs = require("fs");

describe("Task Controller test", () => {
  it("It should create a new task", function(done) {
    let taskData = {
      name: "Legend Of Zelda Concept Art",
      description: "Legend Of Zelda"
    };

    chai
      .request("http://localhost:4000")
      .post("/task/")
      .send(taskData)
      .end((err, res) => {
        if (err) {
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

  it("It should update the task", function(done) {
    let taskData = {
      name: "Legend Of Zelda Concept Art",
      description: "Legend Of Zelda",
      _id: this.task._id
    };

    chai
      .request("http://localhost:4000")
      .patch("/task/")
      .send(taskData)
      .end(function(err, res) {
          
        if (err) {
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

  it("It gets the task searched for using _id", function(done) {
    chai
      .request("http://localhost:4000")
      .post("/task/find/")
      .send({ 
        _id: this.task._id
      })
      .end(function(err, res) {
        if (err) {
          console.log(err);
          throw err;
        }

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
    });

    

    it("It should delete the task", function(done) {
      let taskData = {
        name: "Legend Of Zelda Concept Art",
        description: "Legend Of Zelda",
        _id: this.task._id
      };

      chai
        .request("http://localhost:4000")
        .patch("/task/")
        .send(taskData)
        .end(function(err, res) {
          if (err) {
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
  });

    describe('Pagination testing', () => {

      before(function(done){

          //Setup data

          this.dropDatabase(done,function(){

              let jsonRawData = fs.readFileSync(__dirname + '/testData/unparentedTask.json');

              Task.insertMany(JSON.parse(jsonRawData).data)
              .then((result)=>{

                  done();

              })
              .catch((err)=>{
                  console.log(err);
              });

          });

      });

      it('It should only retrieve 20 tasks',function(done){

          let data = {
              limit: 20,
              skip: 0
          }

          chai.request("http://localhost:4000")
          .post('/task/page/')
          .send(data)
          .end(function(err,res){



              if(err){
                  console.log(err);
                  
                  throw err;
              }

              res.should.not.equal(undefined);

              res.should.have.status(200);
              res.should.be.a.json;
              res.body.should.be.a("object");

              res.should.have.property("body");
              res.body.should.not.equal(undefined);
              res.body.should.be.a("Object");

              res.body.should.have.property("count");
              res.body.count.should.be.a("Number");
              res.body.count.should.be.equal(54);

              res.body.should.have.property("success");
              res.body.tasks.should.be.a("array");
              res.body.tasks.should.have.length(20);

              

              for(let i = 0;i < res.body.tasks.length;i++){
                  res.body.tasks[i].should.have.property("name");
                  res.body.tasks[i].name.should.be.a("String");
                  res.body.tasks[i].name.should.not.equal(undefined);

                  res.body.tasks[i].should.have.property("description");
                  res.body.tasks[i].description.should.be.a("String");
                  res.body.tasks[i].description.should.not.equal(undefined);
              }

              res.body.should.have.property("tasksPerPage");
              res.body.tasksPerPage.should.be.a("Number");
              res.body.tasksPerPage.should.be.equal(20);

              res.body.should.have.property("currentPage");
              res.body.currentPage.should.be.a("Number");
              res.body.currentPage.should.be.equal(0);

              done();
          })

      });

      it('It should only retrieve 20 tasks after skipping the first 20 ',function(done){

          let data = {
              limit: 20,
              skip: 1
          }

          chai.request("http://localhost:4000")
          .post('/task/page/')
          .send(data)
          .end(function(err,res){

              res.should.not.equal(undefined);

              res.should.have.status(200);
              res.should.be.a.json;
              res.body.should.be.a("object");

              res.should.have.property("body");
              res.body.should.not.equal(undefined);
              res.body.should.be.a("Object");

              res.body.should.have.property("count");
              res.body.count.should.be.a("Number");
              res.body.count.should.be.equal(54);

              res.body.should.have.property("success");
              res.body.tasks.should.be.a("array");
              res.body.tasks.should.have.length(20);

              for(let i = 0;i < res.body.tasks.length;i++){

                  res.body.tasks[i].should.have.property("name");
                  res.body.tasks[i].name.should.be.a("String");
                  res.body.tasks[i].name.should.not.equal(undefined);

                  res.body.tasks[i].should.have.property("description");
                  res.body.tasks[i].description.should.be.a("String");
                  res.body.tasks[i].description.should.not.equal(undefined);

              }

              res.body.should.have.property("tasksPerPage");
              res.body.tasksPerPage.should.be.a("Number");
              res.body.tasksPerPage.should.be.equal(20);

              res.body.should.have.property("currentPage");
              res.body.currentPage.should.be.a("Number");
              res.body.currentPage.should.be.equal(1);

              done();
          });

      });

      it('It should only retrieve remainder 14 tasks',function(done){

          let data = {
              limit: 20,
              skip: 2
          }

          chai.request("http://localhost:4000")
          .post('/task/page/')
          .send(data)
          .end(function(err,res){

              res.should.not.equal(undefined);

              res.should.have.status(200);
              res.should.be.a.json;
              res.body.should.be.a("object");

              res.should.have.property("body");
              res.body.should.not.equal(undefined);
              res.body.should.be.a("Object");

              res.body.should.have.property("count");
              res.body.count.should.be.a("Number");
              res.body.count.should.be.equal(54);

              res.body.should.have.property("success");
              res.body.tasks.should.be.a("array");
              res.body.tasks.should.have.length(14);

              for(let i = 0;i < res.body.tasks.length;i++){
                  res.body.tasks[i].should.have.property("name");
                  res.body.tasks[i].name.should.be.a("String");
                  res.body.tasks[i].name.should.not.equal(undefined);

                  res.body.tasks[i].should.have.property("description");
                  res.body.tasks[i].description.should.be.a("String");
                  res.body.tasks[i].description.should.not.equal(undefined);
              }

              res.body.should.have.property("tasksPerPage");
              res.body.tasksPerPage.should.be.a("Number");
              res.body.tasksPerPage.should.be.equal(20);

              res.body.should.have.property("currentPage");
              res.body.currentPage.should.be.a("Number");
              res.body.currentPage.should.be.equal(2);

              done();
          });
      });

    });

  after(function(done) {
    this.task = null;

    this.dropDatabase(done);
  });
});
