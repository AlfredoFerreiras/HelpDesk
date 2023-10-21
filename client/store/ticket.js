import axios from "axios";

const SET_TICKETS = "SET_TICKETS";
const ADD_TICKET = "ADD_TICKET";
const UPDATE_TICKET = "UPDATE_TICKET";
const DELETE_TICKET = "DELETE_TICKET";

// Assuming you store your token somewhere, e.g., in localStorage
const token = localStorage.getItem("token");

// Create an axios instance that always attaches the token to requests
const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/**
 * ACTION CREATORS
 */
const setTickets = (tickets) => ({
  type: SET_TICKETS,
  tickets,
});

const addTicket = (ticket) => ({
  type: ADD_TICKET,
  ticket,
});

const updateTicket = (ticket) => ({
  type: UPDATE_TICKET,
  ticket,
});

const destroyTicket = (ticket) => ({
  type: DELETE_TICKET,
  ticket,
});

/**
 * THUNK CREATORS
 */
export const fetchTickets = () => async (dispatch) => {
  try {
    const { data } = await api.get("/tickets");
    dispatch(setTickets(data));
  } catch (err) {
    console.error("Fetching tickets went wrong:", err);
  }
};

export const createTicket = (ticket) => async (dispatch) => {
  try {
    const { data } = await api.post("/tickets", ticket);
    dispatch(addTicket(data));
  } catch (err) {
    console.error("Adding ticket went wrong:", err);
  }
};

export const editTicket = (ticket) => async (dispatch) => {
  try {
    const { data } = await api.put(`/tickets/${ticket.id}`, ticket);
    dispatch(updateTicket(data));
  } catch (err) {
    console.error("Editing ticket went wrong:", err);
  }
};

export const deleteTicket = (ticketId) => async (dispatch) => {
  try {
    await api.delete(`/tickets/${ticketId}`);
    dispatch(destroyTicket(ticketId));
  } catch (err) {
    console.error("Deleting ticket went wrong:", err);
  }
};

const initialState = [];

export default function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKETS:
      return action.tickets;
    case ADD_TICKET:
      return [...state, action.ticket];
    case UPDATE_TICKET:
      return state.map((ticket) =>
        ticket.id === action.ticket.id ? action.ticket : ticket
      );
    case DELETE_TICKET:
      return state.filter((ticket) => ticket.id !== action.ticket);
    default:
      return state;
  }
}
