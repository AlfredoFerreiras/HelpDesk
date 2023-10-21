//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Ticket = require("./models/Ticket");

//associations could go here!
User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Ticket,
  },
};
