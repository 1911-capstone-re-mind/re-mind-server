const { green, red } = require("chalk");
const { db } = require("./server/db");
const User = require("../re-mind-server/server/db/models/user");
const Company = require("../re-mind-server/server/db/models/company");

const users = [
  {
    email: "vishal@gmail.com",
    password: "vishal",
    firstName: "Vishal",
    lastName: "Patel",
    type: "employee"
  },
  {
    email: "emily@gmail.com",
    password: "emily",
    firstName: "Emily",
    lastName: "Simpson",
    type: "company-admin"
  },
  {
    email: "marius@gmail.com",
    password: "marius",
    firstName: "Marius",
    lastName: "Maries",
    type: "employee"
  },
  {
    email: "lou@gmail.com",
    password: "lou",
    firstName: "Lou",
    lastName: "Takahashi",
    type: "super-admin"
  }
];

const companies = [
  {
    name: "Tesla"
  },
  {
    name: "CD Project Red"
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      users.map(user => {
        return User.create(user);
      })
    );
    await Promise.all(
      companies.map(company => {
        return Company.create(company);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
