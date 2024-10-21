const Appointment = require('../models/appointmentModel');

const createAppointment = async (req, res) => {
    try {
        const { event, startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({
                statusCode: 400,
                status: "error",
                message: "All fields are required",
            });
        }

        const newAppointment = new Appointment({
            event,
            startDate,
            endDate
        })

        const savedAppointment = await newAppointment.save();


        res.status(200).json({
            success: true,
            message: "Appointment Sehcduled successfully",
            data: savedAppointment
        });

    } catch (error) {
        console.error(error);
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({
            statusCode: 200,
            status: "success",
            data: appointments,
          });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createAppointment,
    getAppointments
}