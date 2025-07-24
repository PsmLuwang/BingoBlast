import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:5000/api" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useTicketStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null, 
 
	viewTickets: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/test`);
			set({ message: response.data.message });
		} catch (error) {
			// set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
}));


