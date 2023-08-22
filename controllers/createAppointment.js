const Appointment = require('../models/Appointment')

module.exports = async (req, res) => {
    try {
        const { appointmentDate, timeslotList } = req.body;

        // Convert timeslotList to an array if it's a single value
        const timeslots = Array.isArray(timeslotList) ? timeslotList : [timeslotList];

        // Create an array of appointment objects
        const appointments = timeslots.map((time) => ({
            date: new Date(appointmentDate),
            //date: date,
            time: time
        }));

        // Save the appointments to the Appointment collection
        await Appointment.insertMany(appointments);

        res.redirect('/');
    
    } catch (error) {
    console.log(error)
}
}


