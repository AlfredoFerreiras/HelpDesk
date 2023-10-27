import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, editTicket, deleteTicket } from "../store/ticket";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket); // Assuming you have a tickets slice in your Redux store

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleStatusChange = (ticketId, newStatus) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket) {
      const updatedTicket = { ...ticket, status: newStatus };
      dispatch(editTicket(updatedTicket));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        opacity: { delay: 0.2 },
        scale: {
          type: "spring",
          damping: 8,
          stiffness: 70,
          restDelta: 0.01,
        },
      }}>
      <Container className="admin-panel-container">
        <Row>
          <Col>
            <h2 className="admin-header">Tickets</h2>
          </Col>
        </Row>
        {tickets?.map((ticket) => (
          <Row key={ticket.id} className="ticket">
            <Col>
              <h3>{ticket.name}</h3>
              <p>Email: {ticket.email}</p>
              <p>Description: {ticket.description}</p>
              <p>Status: {ticket.status}</p>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket.id, e.target.value)
                  }>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => dispatch(deleteTicket(ticket.id))}>
                Delete Ticket
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </motion.div>
  );
};

export default AdminPanel;
