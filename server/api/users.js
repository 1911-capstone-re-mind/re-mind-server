const router = require("express").Router();
const { User, Activity, Company, UserActivity } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!

      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(users)

  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const singleUserActivity = await User.findOne({
      where: { userId: req.param.id, type: "employee" },
      include: [{ model: UserActivity }]
    });
    res.json(singleUserActivity);
  } catch (err) {
    next(err);
  }
});

router.get("/:companyId", async (req, res, next) => {
  try {
    const companyUsers = await User.findAll({
      where: { companyId: req.param.companyId },
      include: [{ model: UserActivity }]
    });
    res.json(companyUsers);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
