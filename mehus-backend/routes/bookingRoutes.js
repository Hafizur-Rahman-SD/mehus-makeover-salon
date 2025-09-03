import express from "express";
import { addBooking, getBookings,updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();
//post:add new booking
router.post("/", addBooking);
//get: all bookings
router.get("/", getBookings);
//put: update booking status
router.put("/:id/status", updateBookingStatus);  // status update

export default router;
