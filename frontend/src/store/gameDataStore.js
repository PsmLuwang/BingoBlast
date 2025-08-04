import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_ENV == "development" 
? "http://localhost:5000" 
: import.meta.env.VITE_API_URL;


axios.defaults.withCredentials = true;

export const useGameDataStore = create((set) => ({
	gameData: null,
  players: [],
	success: false,
	error: null,
	isLoading: false,
	message: null,

  uploadNewGame: async (data) => {
		set({ isLoading: true, error: null, success: false });
		try {
			const response = await axios.post(`${API_URL}/api/gameData/upload`, data);
			set({ gameData: response.data.gameData, success: true, isLoading: false });
		} catch (error) {
      set({ error: error.response.data.message || "Error uploading new game", isLoading: false });
			throw error;
		}
	},
  
  viewGameData: async (_id) => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.post(`${API_URL}/api/gameData/view`, {_id});
      
      set({ gameData: response.data.game, players: response.data.players, success: true, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error viewing latest game", isLoading: false });
			throw error;
    }
  },

  bookingToggle: async () => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.get(`${API_URL}/api/gameData/bookingToggle`);
      
      set({ gameData: response.data.game, success: true, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error toggling booking status", isLoading: false });
			throw error;
    }
  },

  paymentToggle: async (playerID) => {
    set({ isLoading: true, error: null, success: false });
    try {
      const response = await axios.post(`${API_URL}/api/gameData/paymentToggle`, { playerID });
      
      set({ success: true, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error toggling booking status", isLoading: false });
			throw error;
    }
  }
	
}));



