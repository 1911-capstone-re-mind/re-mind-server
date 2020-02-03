const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/activities", require("./activities"));
router.use("/activity-log", require("./activityLog"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
