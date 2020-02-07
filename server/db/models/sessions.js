const Sequelize = require("sequelize");
const db = require("../db");

const Sessions = db.define("Sessions", {
  sid: {
    type: Sequelize.TEXT
  },
  expires: {
    type: Sequelize.DATE
  },
  data: {
    type: Sequelize.TEXT
  }
});

module.exports = Sessions;
