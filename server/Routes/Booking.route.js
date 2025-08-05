const express = require('express')
const router = express.Router()
const {createBooking,getBookingByPatientId} = require('../Controller/Booking.controller')
const {verifyToken} = require('../MiddleWare/authMiddleWare')

router.post('/create',verifyToken,createBooking)
router.get('/get',verifyToken,getBookingByPatientId)

module.exports = router

