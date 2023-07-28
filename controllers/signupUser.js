const User = require("../models/User");

module.exports = async (req, res) => {
    try {
        const { username, password, confirmPassword, usertype } = req.body;

        if (password === confirmPassword) {
            //check if username already exists
            const user = await User.findOne({ username: username });
            if (!user) {
                //create a new user
                await User.create({
                    firstname: "default",
                    lastname: "default",
                    license_number: "default",
                    age: 0,
                    username: username,
                    password: password,
                    usertype: usertype,
                    car_details: {
                        make: "default",
                        model: "default",
                        year: 0,
                        plate: "default",
                    },
                });
                res.redirect("/login");
            }
        }
    } catch (error) {
        console.log(error);
        const validationErrors = Object.keys(error.errors).map(
            (key) => error.errors[key].message
        );
        req.flash("validationErrors", validationErrors);
        req.flash("data", req.body);
        res.redirect("/signup");

    }
};
