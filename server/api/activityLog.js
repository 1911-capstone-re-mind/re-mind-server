const router = require("express").Router();
const { ActivityLog, UserPreferences } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const log = await ActivityLog.findAll({
      include: [
        {
          model: UserPreferences,
          where: {
            userId: req.params.userId
          }
        }
      ]
    });
    res.send(log);
  } catch (error) {
    next(error);
  }
});

router.put("/log", async (req, res, next) => {
  const activities = req.body
  try {
    for (let activity of activities) {
      await ActivityLog.update({
        completed_sessions: activity.completed_sessions,
        month: activity.month,
        date: activity.date
      },
      {
        where: {
          id: activity.id
        }
      }
      )
    }
    res.sendStatus(200)
  } catch (error) {
    next(error);
  }
});
