var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

var models = require('../model/index');

var fs = require('fs');

chai.use(chaiHttp);

// var models  = require('../models');
// var express = require('express');
// var router  = express.Router();

// router.post('/create', function(req, res) {
//   models.User.create({
//     username: req.body.username
//   }).then(function() {
//     res.redirect('/');
//   });
// });

describe("Task Model Test", function(done) {
  it("It should create a task", function(done) {

    let task = {
      name: 'Finish skin shader for Nathan Drake',
      status: 'In Progress',
      description: 'Make hyper realistic skin shader for Nathan Drake in UE4'
    };

    models.task.create(task)
    .then(function(taskCreated){

      let plain = taskCreated.get({plain:true});

      plain.should.be.a("object");

      plain.should.have.property("name");
      plain.name.should.not.equal(undefined);
      plain.name.should.be.a("String");
      plain.name.should.be.equal(task.name);

      plain.should.have.property("status");
      plain.status.should.not.equal(undefined);
      plain.status.should.be.a("String");
      plain.status.should.be.equal(task.status);

      plain.should.have.property("description");
      plain.description.should.not.equal(undefined);
      plain.description.should.be.a("String");
      plain.description.should.be.equal(task.description);

      done();

    })
    .catch((err)=>{
      throw err;
    });

  });

  it('It should update the status of a task',function(done){

    
    models.task.findOne({where: {id: 1}})
    .then((task)=>{
      
      task.status = "Completed";
      
      task.save()
      .then((updatedTask)=>{

        let plain = updatedTask.get({plain: true});

        plain.should.be.a("object");

        plain.should.have.property("name");
        plain.name.should.not.equal(undefined);
        plain.name.should.be.a("String");
        plain.name.should.be.equal(task.name);

        plain.should.have.property("status");
        plain.status.should.not.equal(undefined);
        plain.status.should.be.a("String");
        plain.status.should.be.equal(task.status);

        plain.should.have.property("description");
        plain.description.should.not.equal(undefined);
        plain.description.should.be.a("String");
        plain.description.should.be.equal(task.description);
        
        done();
      })
      .catch((err)=>{
        console.log(err);
        throw err;
      })
      

    })
    .catch((err)=>{
      console.log(err);
    })
  });

  it('It should delete a task',function(done){
    
    models.task.destroy(
      {where: {id: 1}},
    )
    .then((data)=>{

      data.should.not.equal(undefined);
      data.should.be.a("number");
      data.should.be.equal(1);
      
      done();
    })
    .catch((err)=>{
      console.log(err);
      throw err;
    })
  });

  describe('It should be able to paginate the task', () => {
    before('It will do a bulk create to populate the database ',function(done){

      let jsonRawData = fs.readFileSync(__dirname + '/testData/unparentedTask.json');

      let data = JSON.parse(jsonRawData).data;

      models.task.bulkCreate(
        data
      )
      .then((result)=>{
        done();
      })
      .catch((err)=>{
        console.log(err);
      });

    });

    it('It should get the first 20 tasks',function(done){

      models.task.findAll({limit:20,raw:true})
      .then((data)=>{

        data.should.not.equal(undefined);
        data.should.be.a("array");
        data.should.have.length(20);

        for(let i = 0;i < data.length;i++){
          
          data[i].should.have.property('id');
          data[i].id.should.not.equal(undefined);
          data[i].id.should.be.a('number');
          
          data[i].should.have.property('name');
          data[i].name.should.not.equal(undefined);
          data[i].name.should.be.a('String');

          data[i].should.have.property('description');
          data[i].description.should.not.equal(undefined);
          data[i].description.should.be.a('String');
          
          data[i].should.have.property('parentId');
          (data[i].parentId===null).should.be.equal(true);
          
          data[i].should.have.property('createdAt');
          data[i].createdAt.should.not.equal(undefined);
          data[i].createdAt.should.be.a('date');

          data[i].should.have.property('updatedAt');
          data[i].updatedAt.should.not.equal(undefined);
          data[i].updatedAt.should.be.a('date');

        }

        done();
      })
      .catch((err)=>{
        console.log(err);
        throw err;
      })

    });
    
    it('It should get the 20 tasks after 15 offset',function(done){

      models.task.findAll({limit:20,offset:15,raw:true})
      .then((data)=>{

        data.should.not.equal(undefined);
        data.should.be.a("array");
        data.should.have.length(20);

        for(let i = 0;i < data.length;i++){
          
          data[i].should.have.property('id');
          data[i].id.should.not.equal(undefined);
          data[i].id.should.be.a('number');
          
          data[i].should.have.property('name');
          data[i].name.should.not.equal(undefined);
          data[i].name.should.be.a('String');

          data[i].should.have.property('description');
          data[i].description.should.not.equal(undefined);
          data[i].description.should.be.a('String');
          
          data[i].should.have.property('parentId');
          (data[i].parentId===null).should.be.equal(true);
          
          data[i].should.have.property('createdAt');
          data[i].createdAt.should.not.equal(undefined);
          data[i].createdAt.should.be.a('date');

          data[i].should.have.property('updatedAt');
          data[i].updatedAt.should.not.equal(undefined);
          data[i].updatedAt.should.be.a('date');

        }

        done();
      })
      .catch((err)=>{
        console.log(err);
        throw err;
      })
    });

  });

  after(function(done){
    
    done();
  });
});
