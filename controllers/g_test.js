const User = require('../models/User')
//const { maskLicenseNumber } = require('../public/js/maskLicenseNumber');

module.exports = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (user) {
            // const license_number = maskLicenseNumber(user.license_number);
            const license_number = user.license_number;
            res.render('g_test', { user, license_number })
        }
    } catch (error) {
        console.log(error);
    }
}