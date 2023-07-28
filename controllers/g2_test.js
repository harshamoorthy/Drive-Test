const User = require('../models/User')

module.exports = async (req, res) => {
    try {

        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (user) {
            const license_number = user.license_number;
            res.render('g2_test', { license_number })
        }

    } catch (error) {
        console.log(error);
    }

}