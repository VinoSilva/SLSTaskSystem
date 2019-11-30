module.exports = function(sequelize,DataTypes){
    
    var task = sequelize.define('task',{
        name: {
          type:Sequelize.STRING,
          allowNull: false,
          validate: {
            is: {
              args: /^[a-z]+$/i,
              msg: 'Only letters are allowed'
            },
            notEmpty: true,
          }
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: 
            {
              args: [["In Progress", "Done", "Completed"]],
              msg: "Must be In Progress, Done or Completed"
            }
          }
        }
    });

    task.belongsTo(task,{as: 'parent'});

    return task;
}