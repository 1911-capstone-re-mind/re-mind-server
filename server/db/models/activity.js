const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  frequency: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Activity;
