const router = require("express").Router();
const { Activity } = require("../db/models");
const { UserActivity } = require("../db/models");
module.exports = router;

router.put("/:userId", async (req, res, next) => {
  try {
    req.body.forEach(async activity => {
      const userActivity = await UserActivity.findOne({
        where: {
          userId: activity.userId,
          activityId: activity.activityId
        }
      });
      if (userActivity) {
        activity.duration && (userActivity.duration = activity.duration);
        activity.time_preference &&
          (userActivity.time_preference = activity.time_preference);
        await userActivity.save();
      } else {
        await UserActivity.create(activity);
      }
    });
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
