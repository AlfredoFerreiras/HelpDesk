"use strict";

const {
  db,
  models: { User, Ticket },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [shanti, daniel, alfredo] = await Promise.all([
    User.create({ username: "shanti", password: "123" }),
    User.create({ username: "daniel", password: "123" }),
    User.create({ username: "alfredo", password: "123" }),
  ]);
  const tickets = await Promise.all([
    Ticket.create({
      name: "Login Issues",
      email: "shantibraford@gmail.com",
      description: "Unable to login with correct credentials.",
      status: "Open",
      userId: shanti.id,
    }),
    Ticket.create({
      name: "Event Deletion",
      email: "daniel@gobioverse.com",
      description: "Events are not getting deleted.",
      status: "Closed",
      userId: daniel.id,
    }),
    Ticket.create({
      name: "System Error",
      email: "alfredoferreiras@yahoo.com",
      description: "An error occurred while trying to create an event.",
      status: "Open",
      userId: alfredo.id,
    }),
  ]);

  console.log(`seeded successfully`);
  return {
    users: {
      shanti,
      daniel,
      alfredo,
    },
    tickets,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
