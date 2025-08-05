import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MedicalProfessionalAuth from "./Pages/Login";
import Home from "./Pages/Home";
import BookingModel from "./Pages/Booking";
import LandingPage from "./Pages/LandingPage";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="login" element={<MedicalProfessionalAuth />} />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <BookingModel/>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
