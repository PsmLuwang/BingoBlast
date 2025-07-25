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
		set({ isLoading: true, error: null });
		if (numOfTickets <= 0 || !numOfTickets || numOfTickets > 6) {
			set({ error: "Please enter between 1 to 6 only.", tickets: [], isLoading: false });
			return;
		}
		try {
			const response = await axios.get(`${API_URL}/api/ticket/generate?numOfTickets=${numOfTickets}`);
			set({ message: response.data.message, tickets: response.data.tickets, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	viewTickets: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/api/test`);
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
}));


