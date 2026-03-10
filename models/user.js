const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {}
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Username must be a valid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
  })

  return User
}