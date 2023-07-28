module.exports = async (req, res) => {
    var username = ""
    var password = ""
    const data = req.flash('data')[0];

    //check if the data is not empty before sending the data
    if (typeof data != "undefined") {
        username = data.username
        password = data.password
    }
    res.render('signup', {
        errors: await req.flash('validationErrors'),
        username: username,
        password: password
    })
}