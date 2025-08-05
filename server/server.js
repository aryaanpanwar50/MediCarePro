const express = require('express');
const connectDb = require('./Config/db.js');
const cors = require('cors')
const path = require('path');
const PatientRoutes = require('./Routes/Patient.route.js');
const TestRoutes = require('./Routes/Test.Route.js')
const BookingRoutes = require('./Routes/Booking.route.js')
const AuthRefresh = require('./Routes/MiddleWare.route.js')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;



// CORS Configuration with dynamic origin handling
app.use(cors({
    origin: [
        'http://localhost:5173',                      // Local development frontend
        'http://localhost:5000',                      // Alternative local port
        'https://medi-care-pro-xi.vercel.app'      // Production frontend domain
    ],
    credentials: true,  // Allow cookies for OAuth sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Allowed HTTP methods
}));






app.use(express.json());
app.use('/clinic/patient', PatientRoutes);
app.use('/clinic/test',TestRoutes)
app.use('/clinic/booking',BookingRoutes)
app.use('/reports',express.static(path.join(__dirname,'public')))
app.use('/clinic',AuthRefresh)

app.get('/',(req,res)=>{
   res.send("This is a clinic")
})




app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`The server is running on Port ${PORT}`);
    } catch (error) {
        console.log("Internal server error", error);
    }
});