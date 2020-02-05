const router = require("express").Router();
const { ActivityLog, UserPreferences, Activity } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const log = await ActivityLog.findAll({
      include: [
        {
          model: UserPreferences,
          where: {
            userId: req.params.userId
          },
          include: [
            {
              model: Activity
            }
          ]
        }
      ]
    });
    res.send(log);
  } catch (error) {
    next(error);
  }
});
