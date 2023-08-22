// Name: Harsha Vardhini Thirumoorthy 

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/User')

const expressSession = require('express-session')
const flash = require('connect-flash')

//controller files
const homeController = require('./controllers/home')
const g2_testController = require('./controllers/g2_test')
const g_testController = require('./controllers/g_test')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const newUserController = require('./controllers/newUser')
const getUserDetailsController = require('./controllers/getUserDetails')
const updateCarDetailsController = require('./controllers/updateCarDetails')
const signupController = require('./controllers/signup')
const signupUserController = require('./controllers/signupUser')
const logoutController = require('./controllers/logout')
const appointmentController = require('./controllers/appointment')
const createAppointmentController = require('./controllers/createAppointment')
const getTimeSlotsForAdminController = require('./controllers/getTimeSlotsForAdmin')
const getBookedTimeSlotController =require('./controllers/getBookedTimeSlot')
//custom middleware
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticated')
const checkUserTypeDriverMiddleware = require('./middleware/checkUserTypeDriver')
const checkUserTypeAdminMiddleware = require('./middleware/checkUserTypeAdmin')

// In-built middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(flash())

app.use(expressSession({
    secret: 'love express'
}))

//for navbar control
global.loggedIn = null

app.use("*", async (req, res, next) => {

    loggedIn = req.session.userId
    if (loggedIn) {
        // Find the user in the database based on the user ID
        const user = await User.findById(loggedIn);
        //pass the userType as a local variable
        res.locals.userType = user ? user.usertype : null;
    } else {
        res.locals.userType = null;
    }
    next()
})

// create server
app.listen(1111, () => {
    console.log('App is listening at port no 1111')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.1pbbwjd.mongodb.net/driveTest?retryWrites=true&w=majority')

//route index
app.get('/', homeController)

//route g2_test
app.get('/g2_test', checkUserTypeDriverMiddleware, g2_testController)

//route g_test
app.get('/g_test', checkUserTypeDriverMiddleware, g_testController)

//route login
app.get('/login', redirectIfAuthenticatedMiddleware, loginController);

//login user
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

//create new user in user collection
app.post('/users/store', newUserController)

//fetch the user details from user collection
app.post('/g_test', getUserDetailsController);

//update car details
app.post('/updateCarDetails', updateCarDetailsController)

//signup
app.get('/signup', redirectIfAuthenticatedMiddleware, signupController)

//signup user
app.post('/users/signup', signupUserController)

app.get('/appointment',checkUserTypeAdminMiddleware, appointmentController)

app.post('/appointment/create', createAppointmentController )

// API route 
app.get('/getTimeslots', getTimeSlotsForAdminController)
app.get('/getBookedTimeslots',getBookedTimeSlotController )

//
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))

