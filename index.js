// Name: Harsha Vardhini Thirumoorthy 
// Student Num: 8847377 

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/User')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')
// create server
app.listen(1111, () => {
    console.log('App is listening at port no 1111')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.1pbbwjd.mongodb.net/driveTest?retryWrites=true&w=majority')

//route index
app.get('/', async (req, res) => {    
    try {
        const users = await User.find({})
        res.render('index', {
            users
        })
    } catch (error) {
        console.log(error)
    }
})

//route g2_test
app.get('/g2_test', (req, res) => {
    res.render('g2_test')
})


//route g_test
app.get('/g_test', (req, res) => {
    res.render('g_test')
})

//route login
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'post.html'))
    res.render('login')
})

//create new user in user collection
app.post('/users/store', async (req, res) => {
    try {
        const { firstname, lastname, license_number, age, make, model, year, plate } = req.body;

        await User.create({
            firstname,
            lastname,
            license_number,
            age,
            car_details: {
                make: make,
                model: model,
                year: year,
                plate: plate
            }
        });
        res.redirect('/g_test');

    } catch (error) {
        console.log(error)
    }
})

//fetch the user details from user collection
app.post('/g_test', async (req, res) => {
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
});

//update user details
app.post('/updateCarDetails', async (req, res) => {
    try {
        const { license_number, make, model, year, plate } = req.body;
        const user = await User.findOne({ license_number: license_number });
        if (user) {

            if (
                user.car_details.make !== make ||
                user.car_details.model !== model ||
                user.car_details.year !== year ||
                user.car_details.plate !== plate
            ) {
                // update car details in the database
                user.car_details.make = make;
                user.car_details.model = model;
                user.car_details.year = year;
                user.car_details.plate = plate;
                user.save();
            }
            res.redirect('/g_test');
        }
    } catch (error) {
        console.log(error)
    }
})

