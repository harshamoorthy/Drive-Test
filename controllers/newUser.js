const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const { firstname, lastname, license_number, age, make, model, year, plate } = req.body;
        // Retrieve the logged-in user's _id from the session
        const userId = req.session.userId;

        // Check if the user is logged in (userId should exist in the session)
        if (userId) {

            const user = await User.findById(userId);

            // Update the user's details
            if (user) {
                user.firstname = firstname;
                user.lastname = lastname;
                // Encrypt the license_number using bcrypt
                const hashedLicenseNumber = await bcrypt.hash(license_number, 10);
                user.license_number = hashedLicenseNumber;
                user.age = age;
                user.car_details.make = make;
                user.car_details.model = model;
                user.car_details.year = year;
                user.car_details.plate = plate;
                await user.save();

                res.redirect('/');
            }
        }
    } catch (error) {
        console.log(error)
    }
}

