const Sequelize = require('sequelize');
const db = require('../db');

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Company;
