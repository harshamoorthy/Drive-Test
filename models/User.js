// Name: Harsha Vardhini Thirumoorthy 

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


//define the structure of collection
const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    license_number: String,
    age: Number,
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    usertype: String,
    appointmentDate: {
        type: Date
      },
    appointmentTime: {
        type: String
      },
    car_details: {
        make: String,
        model: String,
        year: Number,
        plate: String
    }
})
UserSchema.plugin(uniqueValidator);
//pre method - process something before saving in db
UserSchema.pre('save', function (next) {
    const user = this
    //10 - number of times the password will be encryptped
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User
