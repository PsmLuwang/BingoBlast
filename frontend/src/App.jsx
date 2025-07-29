import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AdminRoute from "./routes/AdminRoute";

import AdminPanel from "./pages/AdminPanel.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
     
      <Route path="/adminPanel" 
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } 
      />

    </Routes>
  )
}

export default App
