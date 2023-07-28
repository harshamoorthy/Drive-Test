const User = require('../models/User')

module.exports = async (req, res) => {
    try {
        const users = await User.find({})
        res.render('index', {
            users
        })
    } catch (error) {
        console.log(error)
    }
}