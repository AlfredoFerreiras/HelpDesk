import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTicket, fetchTickets } from "../store/ticket";

import { Link, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const SubmitTicket = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      dispatch(
        createTicket({
          ...formData,
          id: id,
        })
      );
      console.log("Ticket submitted with description:", formData.description);
    } catch (error) {
      console.error("Error submitting ticket:", error);
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
      <Container className="container p-4">
        {" "}
        {/* Add p-4 for padding */}
        <h1>Submit Ticket</h1>
        <Form className="form-container">
          <Form.Group>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Form.Group>
          <Link
            to="/AdminPanel"
            className="btn btn-primary"
            onClick={handleSubmit}>
            Submit
          </Link>
        </Form>
      </Container>
    </motion.div>
  );
};

export default SubmitTicket;
