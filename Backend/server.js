const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const Vehicles = require('./models/vehicle_model')
const vehiclesList = require('./vehicle.js')
const router = require('./routes/route')

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect( process.env.ATLAS_URI , {
    useNewUrlParser : true,
    useUnifiedTopology : true ,
    useCreateIndex : true
}, (err) => {
    if( err ){
        console.log("Connection to database failed!!")
    }
    else{
        console.log("Connection to database is Successfull!!")
        // Vehicles.insertMany(vehiclesList)
        //         .then(() => console.log("Inserted SuccessFully"))
        //         .catch((err) => console.log(err))
    }
})

app.use('/' , router)

app.listen(5000 , () => {
    console.log("Server is up and running sucessfully at port 5000!!")
})