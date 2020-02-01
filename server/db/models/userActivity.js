const Sequelize = require("sequelize");
const db = require("../db");

const UserActivity = db.define("user_activities", {
  time_preference: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER
  },
  completed_sessions: {
    type: Sequelize.INTEGER
  }
});

module.exports = UserActivity;
