const User = require('../models/User')

module.exports =async (req, res) => {
    const date = req.query.date;

    //Fetch booked appointments for the date
    const bookedAppointments = await User.find({
      appointmentDate: date
    })
    .select('appointmentTime');

    // Extract just the time values
    const bookedTimes = bookedAppointments.map(app => app.appointmentTime);

    res.json(bookedTimes);
    
  
  }