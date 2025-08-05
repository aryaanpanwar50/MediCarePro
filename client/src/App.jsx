import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MedicalProfessionalAuth from "./Pages/Login";
import Home from "./Pages/Home";
import BookingModel from "./Pages/Booking";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<MedicalProfessionalAuth />} />
          <Route path="/booking" element={<BookingModel/>}/>
        </Routes>
    </Router>
  );
}

export default App;
