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
        'http://localhost:5173',
        'http://localhost:5000',
        'https://medi-care-pro-xi.vercel.app',
        // Add your Vercel backend URL here
        'https://khelzy-backend.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Connect to database before setting up routes
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({
            success: false,
            error: 'Database connection failed'
        });
    }
});

app.use('/clinic/patient', PatientRoutes);
app.use('/clinic/test', TestRoutes);
app.use('/clinic/booking', BookingRoutes);
app.use('/reports', express.static(path.join(__dirname, 'public')));
app.use('/clinic', AuthRefresh);

app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: "Digital Health Clinic API is running",
        timestamp: new Date().toISOString()
    });
});

// For Vercel, export the app
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`The server is running on Port ${PORT}`);
    });
}

module.exports = app;