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



app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : ['https://medi-care-pro-backend.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));





app.use(express.json());
app.use('/clinic/patient', PatientRoutes);
app.use('/clinic/test',TestRoutes)
app.use('/clinic/booking',BookingRoutes)
app.use('/reports',express.static(path.join(__dirname,'public')))
app.use('/',AuthRefresh)

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