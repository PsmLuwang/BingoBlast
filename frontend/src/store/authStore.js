import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:5000" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

  signup: async (email, password, name, phone) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/register`, { email, password, name, phone: phone || "" });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

  login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},
 
  logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/api/auth/logout`, null, { withCredentials: true });
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

  checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/api/auth/checkAuth`, { withCredentials: true });
      
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
      
		} catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	
}));



