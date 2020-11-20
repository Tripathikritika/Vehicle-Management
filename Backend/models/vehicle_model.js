const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
    registration_id : {
        type : String ,
        required : true      
    },
    name : {
        type : String ,
        required : true
    },
    image : {
        type : String ,
        required : true
    },
    price : {
        type : String ,
        required : true
    },
    type :{
        type : String ,
        required : true
    },
    no_of_passengers : {
        type : String ,
        required : true
    },
    vehicle_trips : {
        type : Array ,
        required : true
    },
    operators : {
        type : String ,
        required : true
    }
} , 
{
    versionKey : false
})

module.exports = mongoose.model( "Vehicles",vehicleSchema)