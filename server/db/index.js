const db = require("./db");

// register models
require("./models");
const User = require("./models/user");
const Company = require("./models/company");

module.exports = { db, User, Company };
