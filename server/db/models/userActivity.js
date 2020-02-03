const Sequelize = require("sequelize");
const db = require("../db");

const UserActivity = db.define("user_activities", {
  completed_sessions: {
    type: Sequelize.INTEGER
  }
});

module.exports = UserActivity;
