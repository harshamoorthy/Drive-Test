const User = require('../models/User')

module.exports = async (req, res) => {
    try {
        const { license_number, make, model, year, plate } = req.body;
        const user = await User.findOne({ license_number: license_number });
        if (user) {

            if (
                user.car_details.make !== make ||
                user.car_details.model !== model ||
                user.car_details.year !== year ||
                user.car_details.plate !== plate
            ) {
                // update car details in the database
                user.car_details.make = make;
                user.car_details.model = model;
                user.car_details.year = year;
                user.car_details.plate = plate;
                user.save();
            }
            res.redirect('/');
        }
    } catch (error) {
        console.log(error)
    }
}