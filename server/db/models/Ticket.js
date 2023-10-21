const Sequelize = require("sequelize");
const db = require("../db"); // Assuming you have a db.js file as in the code snippets you provided.

const Ticket = db.define("ticket", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Open", "In Progress", "Closed"),
    defaultValue: "Open",
  },
});

module.exports = Ticket;
