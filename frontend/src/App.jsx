import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminPanel from "./pages/AdminPanel.jsx";
import LoadingAnimation from "./components/LoadingAnimation.jsx";





// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return children;
};

// Admin route
const AdminProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated || user.role != "admin") {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  const { checkAuth, isCheckingAuth  } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return (<LoadingAnimation />)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      
      <Route path="/register" 
        element={
          <Register />
        } 
      />

      <Route path="/login" 
        element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } 
      />
     
      <Route path="/adminPanel" 
        element={
          <AdminProtectedRoute>
            <AdminPanel />
          </AdminProtectedRoute>
        } 
      />

    </Routes>
  )
}

export default App
