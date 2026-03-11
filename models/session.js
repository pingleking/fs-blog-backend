const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Session extends Model {}
  
  Session.init({
    token: {
      type: DataTypes.STRING(500),
      primaryKey: true,
      allowNull: false
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session'
  })

  return Session
}