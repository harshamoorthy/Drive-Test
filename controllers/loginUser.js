const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username: username })

        if (user) {
            const same = await bcrypt.compare(password, user.password)

            if (same) {
                //user allowed to login 
                req.session.userId = user._id //user session
                res.redirect('/g2_test')
            } else {
                res.redirect('/signup')
            }
        } else {
            // When user doesn't exist, ask user to sign up first
            res.render('login', {
                message: "User does not exist. Please sign up first."
            });
        }

    } catch (error) {
        //handle error
        console.log(error)
    }
}