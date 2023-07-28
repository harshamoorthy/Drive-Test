const User = require('../models/User')

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ license_number: req.body.license });
        if (user) {
            res.render('g_test', { user });

        } else {
            res.render('g_test', { userNotFound: true });
        }
    } catch (error) {
        console.log(error);
        res.redirect('/g_test');
    }
}