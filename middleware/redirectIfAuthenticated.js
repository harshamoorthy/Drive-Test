module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')

    }
    next() //so the app is not stuck here, so define next()
}