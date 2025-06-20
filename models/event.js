'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    totalTickets: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};