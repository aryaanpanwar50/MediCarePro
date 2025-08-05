const Booking = require("../Model/Booking.model");

const createBooking = async (req, res) => {
  try {
    const { testId, date } = req.body;

    

    const newBooking = new Booking({
      patientId: req.patient._id,
      testId,
      date,
      
    });

    await newBooking.save();
    return res.status(201).json({
      success: true,
      message: "The booking is created",
      newBooking,
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
    const patientId  = req.patient._id;

    const bookedTest = await Booking.find({ patientId }).populate('testId')
    if (bookedTest.length == 0) {
      return res.status(200).json({ 
        success: true,
        message: "No bookings found",
        bookings: []
      })
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetch the data",
      bookings: bookedTest
    });
  } catch (error) {
    console.error("Unable to fetch the booking", error);
    res.status(500).json({
      success: false,
      error: "Unable to fetch the booking",
    });
  }
};

module.exports = { createBooking, getBookingByPatientId };
