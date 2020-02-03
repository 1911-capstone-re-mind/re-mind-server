const router = require("express").Router();
const { User, Activity, Company, UserActivity } = require("../db/models");

router.post("/", async (req, res, next) => {
  try {
    const userActivity = await UserActivity.create(req.body);
    res.json(userActivity);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
