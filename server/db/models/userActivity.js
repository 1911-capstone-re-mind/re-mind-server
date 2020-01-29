const Sequelize = require('sequelize');
const db = require('../db');

const UserActivity = db.define('user_activity', {
  time_preference: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  completed_sessions: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UserActivity;
