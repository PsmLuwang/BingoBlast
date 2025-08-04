import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:5000" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useTicketStore = create((set) => ({
	// hidden feature for admin login
	responseFor: null,
	name: null,
	email: null,
	phone: null,
	role: null,
	//////////////////

	gameID: null,
	playerID: null,
	buyer: null,
	tickets: [],
	payment: false,
	error: null,
	isLoading: false,
	message: null, 
	success: false,
 
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
		if (tickets.length <= 0 ) {
			set({ error: "Please generate tickets.", isLoading: false });
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


	viewTickets: async (playerID) => {
		if (!playerID) {
			set({ error: "Enter your ID.", success: false });
			return;
		}
		set({ isLoading: true, error: null });

		try {
			const response = await axios.get(`${API_URL}/api/ticket/view?playerID=${playerID}`);

			if (response.data.message == "Wrong player ID.") {
				set({ message: "Wrong ID", isLoading: false, role: "user" });
				return;
			}

			if (response.data.responseFor == "tickets") {
				set({
					responseFor: response.data.responseFor,
					success: response.data.success,
					playerID: response.data.playerID,
					payment: response.data.payment,
					tickets: response.data.tickets,
					isLoading: false
				});
			} else if (response.data.responseFor == "user") {
				set({
					responseFor: response.data.responseFor,
					success: response.data.success,
					name: response.data.name,
					email: response.data.email,
					phone: response.data.phone,
					role: response.data.role,
					isLoading: false
				});
			}
			
			set({ isLoading: false });
			
		} catch (error) {
			set({ error: error.response.data.message || "Test API Error", isLoading: false });
			throw error;
		}
	},

	
	// Admin verification
	// isAdminCheck: async () => {
	// 	set({ isLoading: true, error: null });
	// 	try {
	// 		const response = await axios.get(`${API_URL}/api/ticket/isAdminCheck`);
      
	// 		set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
	// 	} catch (error) {
  //     set({ error: null, isCheckingAuth: false, isAuthenticated: false });
	// 	}
	// },


}));



