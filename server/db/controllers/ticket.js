const Ticket = require("../models/Ticket");

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tickets." });
  }
};

exports.addTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a ticket." });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    await Ticket.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the ticket." });
  }
};
