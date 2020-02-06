const router = require("express").Router();
const { User, Activity } = require("../db/models");
const { UserPreferences } = require("../db/models");
module.exports = router;

router.put("/prefs/:userId", async (req, res, next) => {
  let activities = req.body.activities;
  let userId = req.body.userId
  try {
    let user = await User.findByPk(userId)
    for (let activity of activities) {
      let activityDB = await Activity.findByPk(activity.activityId)
      await activityDB.addUser(user, {
        through: {
          frequency: activity.frequency,
          duration: activity.duration,
          active: activity.active
        }
      })
    }
    let userPreferences = await UserPreferences.findAll({
      where: {
        userId
      },
      include: [{model: Activity}]
    })

    res.json(userPreferences);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const prefs = await UserPreferences.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: Activity
        }
      ]
    });
    res.json(prefs);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (err) {
    next(err);
  }
});
