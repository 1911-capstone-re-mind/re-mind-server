const router = require("express").Router();
const { User, Sessions } = require("../db/models")
const { Client } = require('pg')
const client = new Client()

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, err => (err ? next(err) : res.json({user, sessionId: req.sessionID})));

      console.log("TCL: req.user.dataValues in auth/login", req.user.dataValues)
      // console.log("TCL: user", user, "\nand req.sessionID from /login", req.user, 'sessionID:', req.sessionID)
    }
  } catch (err) {
    next(err);
  }
});

router.post("/auto-login", async (req, res, next) => {
  const user = await User.findByPk(req.body.id)
  // console.log("TCL: user", user)
  req.login(user, err => (err ? next(err) : res.json(user)))
})
  // res.redirect("/dashboard");

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    // console.log("TCL: user", user, "\nand req.sessionID", req.sessionID)

    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

router.get("/me", async (req, res, next) => {
  // const sessionId = await Sessions.findAll()
  // console.log("TCL: sessionId", sessionId)
  // await client.query('')
  try
   {
   const returnAllFromSessions = await Sessions.findAll()
  const dataValuesOnly = returnAllFromSessions.map(item => item.dataValues)

  const sidAndUser = dataValuesOnly.map(entry => {
    const parsedData = JSON.parse(entry.data)
    return { sid: entry.sid,
            user: parsedData.passport.user
    }
  })
  // console.log("TCL: returnAllFromSessions", returnAllFromSessions)
  // console.log("TCL: dataValuesOnly", dataValuesOnly)
  console.log("TCL: sidAndUser", sidAndUser)
  // console.log("\nTCL: req.sessionID", req.session, "\nand req.session from /me\n", req.user)
// user", user, "\nand ^^
  res.send(sidAndUser);
  console.log("TCL: req.session", req.session)
  // res.send(req.user)
  }
  catch (error){next(error)}
});
