const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        // Get the user ID from the session
        const userId = req.session.userId;

        if (userId) {

            const user = await User.findById(userId);
            // Check if the user exists and has UserType = "Admin"
            if (user && user.usertype === "Admin") {
                next();
            } else {
                return res.redirect("/");
            }
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/");
    }
};
