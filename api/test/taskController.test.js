var should = require('chai').should();
var chai = require('chai');
var chaiHttp = require('chai-http');

var models = require('../model/index');

var fs = require('fs');

chai.use(chaiHttp);

describe('Task Controller Test',function(done){

    before(function(done){
        models.sequelize.sync({force: true})
        .then(()=>{
            done();
        })
        .catch((err)=>{
            console.log(err);
        });
    });
    
    it('It should return task created with status 200', function(done){

        let task = {
            name: 'Finish skin shader for Nathan Drake',
            status: 'In Progress',
            description: 'Make hyper realistic skin shader for Nathan Drake in UE4'
        };

        chai.request('http://localhost:4000')
        .post('/task/')
        .send(task)
        .end(function(err,res){
            
            if(err){
                console.log(err);
                
                throw err;
            }

            res.should.not.equal(undefined);
            
            res.should.have.property('body');
            res.body.should.not.equal(undefined);
            
            res.body.should.have.property('success');
            res.body.success.should.be.a("String");
            res.body.success.length.should.be.above(0);

            res.body.should.have.property('task');
            res.body.task.should.not.equal(undefined);
            res.body.task.should.be.a("Object");

            res.body.task.should.have.property('id');
            res.body.task.id.should.be.a('Number');
            res.body.task.id.should.equal(1);

            res.body.task.should.have.property('name');
            res.body.task.name.should.be.a('String');
            res.body.task.name.should.equal(task.name);

            res.body.task.should.have.property('status');
            res.body.task.status.should.be.a('String');
            res.body.task.status.should.equal(task.status);

            res.body.task.should.have.property('description');
            res.body.task.description.should.be.a('String');
            res.body.task.description.should.equal(task.description);
            
            res.body.task.should.have.property('updatedAt');
            (new Date(res.body.task.updatedAt)).should.be.a("Date");
          
            res.body.task.should.have.property('createdAt');
            (new Date(res.body.task.createdAt)).should.be.a("Date");


            done();

        });
    });

    it('It should return a task with status 200', function(done){
        
        let task = {
            id: 1
        }

        chai.request('http://localhost:4000')
        .post('/task/find/')
        .send(task)
        .end(function(err,res){

            if(err){
                console.log(err);
                
                throw err;
            }

            res.should.not.equal(undefined);
            
            res.should.have.property('body');
            res.body.should.not.equal(undefined);
            
            res.body.should.have.property('success');
            res.body.success.should.be.a("String");
            res.body.success.length.should.be.above(0);

            res.body.should.have.property('task');
            res.body.task.should.not.equal(undefined);
            res.body.task.should.be.a("Object");

            res.body.task.should.have.property('id');
            res.body.task.id.should.be.a('Number');
            res.body.task.id.should.equal(1);

            res.body.task.should.have.property('name');
            res.body.task.name.should.be.a('String');

            res.body.task.should.have.property('status');
            res.body.task.status.should.be.a('String');

            res.body.task.should.have.property('description');
            res.body.task.description.should.be.a('String');
            
            res.body.task.should.have.property('updatedAt');
            (new Date(res.body.task.updatedAt)).should.be.a("Date");
          
            res.body.task.should.have.property('createdAt');
            (new Date(res.body.task.createdAt)).should.be.a("Date");

            done();
        });
    });

    it('It should update and return task created with status 200', function(done){
        
        let task = {
            id: 1,
            name: 'Finish hair shader for Nathan Drake',
            status: 'Completed',
            description: 'Make hyper realistic skin shader for Nathan Drake in UE4'
        };

        chai.request('http://localhost:4000')
        .patch('/task/')
        .send(task)
        .end(function(err,res){

            if(err){

                console.log(err);

                throw err;
            }

            res.should.be.not.equal(undefined);
            
            res.should.have.property('body');
            res.body.should.not.equal(undefined);
            res.body.should.be.a("object");

            res.body.should.have.property('success');
            res.body.success.should.be.not.equal(undefined);
            res.body.success.should.be.a('String');
            
            res.body.should.have.property('task');
            res.body.task.should.be.a("object");
            res.body.task.should.not.equal(undefined);

            res.body.task.should.have.property("id");
            res.body.task.id.should.be.a("Number");
            res.body.task.id.should.be.equal(1);

            res.body.task.should.have.property("name");
            res.body.task.name.should.be.a("String");
            res.body.task.name.should.be.equal(task.name);

            res.body.task.should.have.property("description");
            res.body.task.description.should.be.a("String");
            res.body.task.description.should.be.equal(task.description);

            res.body.task.should.have.property("status");
            res.body.task.status.should.be.a("String");
            res.body.task.status.should.be.equal(task.status);
            
            done();
        });
    });

    it('It should delete a task using controller route', function(done){
        let task = {
            id: 1
        };

        chai.request('http://localhost:4000')
        .delete('/task/')
        .send(task)
        .end(function(err,res){

            if(err){

                console.log(err);

                throw err;
            }

            res.should.be.not.equal(undefined);
            
            res.should.have.property('body');
            res.body.should.not.equal(undefined);
            res.body.should.be.a("object");

            res.body.should.have.property('success');
            res.body.success.should.be.not.equal(undefined);
            res.body.success.should.be.a('String');
            
            done();
        });
    });


    describe('',function(){

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
      
              throw err;
            });
      
        });

        it('It should get 20 tasks',function(done){
            
            let findData = {
                skip: 0,
                limit: 20
            }

            chai.request('http://localhost:4000')
            .post('/task/page/')
            .send(findData)
            .end(function(err,res){

                if(err){
                    console.log(err);
                    
                    throw err;
                }

                res.should.not.be.equal(undefined);

                res.should.have.property("body");
                res.body.should.be.a("Object");
                res.body.should.not.equal(undefined);
                
                res.body.should.have.property("tasks");
                res.body.tasks.should.be.a("Object");
                res.body.tasks.should.not.equal(undefined);
                
                res.body.tasks.should.have.property("count");
                res.body.tasks.count.should.be.a("Number");
                res.body.tasks.count.should.be.equal(54);

                res.body.tasks.should.have.property("rows");
                res.body.tasks.rows.should.be.a("array");
                res.body.tasks.rows.should.have.length(20);
                
                let data = res.body.tasks.rows;

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
                    // (data[i].parentId===null).should.be.equal(true);
                    
                    data[i].should.have.property('createdAt');
                    data[i].createdAt.should.not.equal(undefined);
                    (new Date(data[i].createdAt)).should.be.a('date');
                    
                    data[i].should.have.property('updatedAt');
                    data[i].updatedAt.should.not.equal(undefined);
                    (new Date(data[i].updatedAt)).should.be.a('date');
                  }

                done();
            });
        });
    });

    after(function(done){
        models.sequelize.sync({force: true})
        .then(()=>{
            done();
        })
        .catch((err)=>{
            console.log(err);
        });
    });

});