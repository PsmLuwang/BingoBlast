import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:5000" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useTicketStore = create((set) => ({
	gameID: null,
	playerID: null,
	buyer: null,
	tickets: [],
	isAdmin: false,
	error: null,
	isLoading: false,
	message: null, 
 
	generateTickets: async (numOfTickets) => {
		set({ isLoading: true, error: null, tickets: [] });
		if (numOfTickets <= 0 || !numOfTickets || numOfTickets > 6) {
			set({ error: "Please enter between 1 to 6 only.", tickets: [], isLoading: false });
			return;
		}
		try {
			const response = await axios.get(`${API_URL}/api/ticket/generate?numOfTickets=${numOfTickets}`);
			set({ message: response.data.message, tickets: response.data.tickets, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error generate tickets", isLoading: false });
			throw error;
		}
	},
	bookingTickets: async (gameID, name, phone, email, tickets) => {
		set({ isLoading: true, error: null });
		if (!gameID || !name || !phone || !tickets) {
			set({ error: "Missing required fields", isLoading: false });
			return;
		}
		try {
			const emailInput = email || null;
			const response = await axios.post(`${API_URL}/api/ticket/booking`, { gameID, name, phone, tickets, email: emailInput });

			set({ tickets: response.data.tickets, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error on booking tickets", isLoading: false });
			throw error;
		}
	},
	viewTickets: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/`);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Test API Error", isLoading: false });
			throw error;
		}
	},
}));


