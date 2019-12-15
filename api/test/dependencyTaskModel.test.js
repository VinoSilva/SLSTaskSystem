var should = require("chai").should();
var chai = require("chai");
var chaiHttp = require("chai-http");

var models = require('../model/index');

var fs = require('fs');

chai.use(chaiHttp);

describe("Task Model Test", function(done) {

  before('It should populate task with parent dependency',function(done){

    let jsonRawData = fs.readFileSync(__dirname + '/testData/parentedTask.json');

    let data = JSON.parse(jsonRawData).data;

    models.task.bulkCreate(
        data
    )
    .then((result)=>{

        done();
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })

  });

  it("It should get a task and all of its parents. (KIV)", function(done) {

    // models.task.getAncestors(9)
    // .then((result)=>{
    //     console.log(JSON.stringify(result));

    //     done();
    // })
    // .catch((err)=>{
    //     console.log(err);
    // });

    done();

  });


  after(function(done){
    
    models.sequelize.sync({force:true})
    .then(()=>{
      done();
    })
    .catch((err)=>{
      console.log(err);
    });
  });
});
