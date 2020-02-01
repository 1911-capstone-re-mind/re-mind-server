const db = require("../server/db");
const { Activity, User, Company } = require("../server/db/models");

const activitiesSeed = [
  {
    name: "posture",
    description:
      "Good posture is about more than standing up straight so you can look your best. It is an important part of your long-term health. Making sure that you hold your body the right way can prevent pain, injuries, and other health problems.",
    frequency: 30,
    duration: 0
  },
  {
    name: "movement",
    description:
      "Sitting too much can contribute to health problems. Being less sedentary can lead to lower blood pressure, increased energy, and reduced risk of cardiovascular disease.",
    frequency: 60,
    duration: 1
  },
  {
    name: "eye strain",
    description:
      "Every 20 minutes, look at something 20 feet away for 20 seconds. The 20/20/20 rule was popularized by Dr. Jeff Anshell, a specialist in “vision ergonomics.”",
    frequency: 20,
    duration: 20
  },
  {
    name: "hydration",
    description:
      "Water is your body's principal chemical component and makes up about 60 percent of your body weight. Your body depends on water to survive. Lack of water can lead to dehydration — a condition that occurs when you don't have enough water in your body to carry out normal functions. Even mild dehydration can drain your energy and make you tired.",
    frequency: 30,
    duration: 0
  },
  {
    name: "mindfulness",
    description:
      "Mindfulness techniques allow us to calm down and to be more receptive than reactive. Whether learning to meditate or merely to tune in with ourselves at various times throughout our day, mindfulness enhances your ability to feel more integrated and to act with integrity. We improve our ability to focus our attention. We are better able to slow the racing thoughts that lead us to engage in limiting or self-sabotaging behaviors. We strengthen our resilience and enhance our capacity to experience the joys of everyday life.",
    frequency: 30,
    duration: 45
  }
];

const usersSeed = [
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

const companiesSeed = [
  {
    name: "Tesla"
  },
  {
    name: "CD Project Red"
  }
];

const seed = async () => {
  await db.sync({ force: true });
  const activities = await Activity.bulkCreate(activitiesSeed);
  const users = await User.bulkCreate(usersSeed);
  const companies = await Company.bulkCreate(companiesSeed);
  for (let user of users) {
    await user.addActivity(activities[1], {
      through: {
        time_preference: 30,
        duration: 20,
        completed_sessions: 1
      }
    });
  }

  console.log(`${activities.length} activities created`);
  console.log(`${users.length} users created`);
  console.log(`${companies.length} companies created`);
};

const runSeed = async () => {
  try {
    await seed();
    console.log("success!");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

runSeed();
