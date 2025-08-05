const Booking = require("../Model/Booking.model");

const createBooking = async (req, res) => {
  try {
    const { testId, appointmentDate, appointmentTime } = req.body;

    // Validate required fields for appointment scheduling
    if (!appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        error: "Appointment date and time are required"
      });
    }

    // Create new booking with appointment details
    const newBooking = new Booking({
      patientId: req.patient._id, // From auth middleware
      testId,
      appointmentDate: new Date(appointmentDate), // Convert string to Date object
      appointmentTime
    });

    // Save booking to database
    await newBooking.save();
    
    // Fetch the complete saved booking to return all fields
    const savedBooking = await Booking.findById(newBooking._id);
    
    return res.status(201).json({
      success: true,
      message: "The booking is created",
      newBooking: savedBooking,
    });
  } catch (error) {
    console.error("Unable to create the booking", error);
    res.status(500).json({
      success: false,
      error: "Unable to create the booking",
    });
  }
};

const getBookingByPatientId = async (req, res) => {
  try {
    // Get patient ID from authenticated user
    const patientId = req.patient._id;

    // Find all bookings for this patient, populate test details, and sort by latest first
    const bookedTests = await Booking.find({ patientId })
      .populate('testId')
      .sort({ createdAt: -1 }); // -1 for descending order (latest first)
    
    // Handle case when no bookings found
    if (bookedTests.length === 0) {
      return res.status(200).json({ 
        success: true,
        message: "No bookings found",
        bookings: []
      });
    }

    // Return successful response with booking data
    return res.status(200).json({
      success: true,
      message: "Successfully fetched booking data",
      bookings: bookedTests
    });
  } catch (error) {
    console.error("Unable to fetch bookings:", error);
    res.status(500).json({
      success: false,
      error: "Unable to fetch bookings",
    });
  }
};

module.exports = { createBooking, getBookingByPatientId };
