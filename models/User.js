// Name: Harsha Vardhini Thirumoorthy 

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

//define the structure of collection
const UserSchema = new Schema({ 
    firstname: String,
    lastname: String,
    license_number: String, 
    age: Number,
    car_details: {
        make: String,
        model: String,
        year: Number,
        plate: String
    }
})

const User = mongoose.model('User', UserSchema) 
module.exports = User
