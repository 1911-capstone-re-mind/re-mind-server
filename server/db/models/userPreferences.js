const Sequelize = require("sequelize");
const db = require("../db");

const UserPreferences = db.define("user_preferences", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  frequency: {
    type: Sequelize.INTEGER
  },
  duration: {
    type: Sequelize.INTEGER
  }
});

module.exports = UserPreferences;
