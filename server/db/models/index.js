const User = require("./user");
const Company = require("./company");
const Activity = require("./activity");
const ActivityLog = require("./activityLog");
const UserPreferences = require("./userPreferences");

//associations
User.belongsTo(Company);
Company.hasMany(User);

User.belongsToMany(Activity, { through: "user_preferences" });
Activity.belongsToMany(User, { through: "user_preferences" });

ActivityLog.belongsTo(UserPreferences);

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
  ActivityLog,
  UserPreferences,
};
