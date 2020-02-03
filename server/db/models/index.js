const User = require("./user");
const Company = require("./company");
const Activity = require("./activity");
const UserActivity = require("./userActivity");
const UserPreferences = require("./userPreferences");

//associations
User.belongsTo(Company);
Company.hasMany(User);

User.belongsToMany(Activity, { through: "user_preferences" });
Activity.belongsToMany(User, { through: "user_preferences" });

User.belongsToMany(Activity, { through: "user_activities" });
Activity.belongsToMany(User, { through: "user_activities" });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */



module.exports = {
  User,
  Company,
  Activity,
  UserActivity,
  UserPreferences
};
