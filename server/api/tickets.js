const router = require("express").Router();
const {
  models: { Ticket, User },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.sendStatus(401);
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const ticket = await Ticket.create({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      status: "Open",
      userId: user.id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.sendStatus(401);
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const tickets = await Ticket.findAll({
      where: {
        userId: user.id,
      },
      include: [User],
    });

    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const ticket = await Ticket.findByPk(req.params.id, {
      where: {
        userId: user.id,
      },
      include: [User],
    });

    if (!ticket) return res.sendStatus(404);

    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) return res.sendStatus(404);

    await ticket.update(req.body);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

// Delete a ticket
router.delete("/:id", async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) return res.sendStatus(404);

    await ticket.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
