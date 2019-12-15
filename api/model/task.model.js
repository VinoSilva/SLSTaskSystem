module.exports = function(sequelize,DataTypes){
    
    var task = sequelize.define('task',{
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: {
              args: /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/,
              msg: 'No special characters are allowed'
            },
            notEmpty: true,
          }
        },
        description: {
          allowNull: false,
          type: DataTypes.TEXT
        },
        status: {
          type: DataTypes.STRING,
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

    task.getAncestors = function(id){
      return this.findAll({
        where: {id: id},
        raw: true
      },{ include: [{ all: true, nested: true }]});
    }

    return task;
}