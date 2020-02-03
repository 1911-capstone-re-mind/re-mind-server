const router = require("express").Router();
const { Activity } = require("../db/models");
const { UserPreferences } = require("../db/models");
module.exports = router;

router.put("/prefs/:userId", async (req, res, next) => {
  try {
    req.body.forEach(async activity => {
      const userPref = await UserPreferences.findOne({
        where: {
          userId: activity.userId,
          activityId: activity.activityId
        }
      });
      if (userPref) {
        activity.duration && (userPref.duration = activity.duration);
        activity.frequency && (userPref.frequency = activity.frequency);
        await userPref.save();
      } else {
        await UserPreferences.create(activity);
      }
    });
    //TO DO: send soemthing back here
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const prefs = await UserPreferences.findAll({
      where: {
        userId: req.params.userId
      }
    });
    console.log(prefs);
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
