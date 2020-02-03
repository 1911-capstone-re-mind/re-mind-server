const Sequelize = require("sequelize");
const db = require("../db");

const ActivityLog = db.define("activity_log", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  completed_sessions: {
    type: Sequelize.INTEGER
  },
  month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = ActivityLog;
