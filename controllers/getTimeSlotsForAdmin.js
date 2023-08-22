const Appointment = require('../models/Appointment')

module.exports =async (req, res) => {
    const date = new Date(req.query.date);
    
   await Appointment.find({date})
      .then(appointment => {
        const times = appointment.map(app => app.time)
        res.json(times);
      })
  
  }