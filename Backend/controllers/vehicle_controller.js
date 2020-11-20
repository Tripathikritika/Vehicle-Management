const Vehicles = require('../models/vehicle_model')

const getVehicles = ( req , res ) => {
    Vehicles.find()
            .then((item) => res.status(200).json(item))
            .catch((err) => res.status(400).json( { message : "Failed To Find from BackEnd"}))
}

const postVehicles = ( req , res ) => {
    // console.log(req.body)
    const { registration_id, name , image , price , type ,no_of_passengers , vehicle_trips,operators} = req.body
    const vehiclesList = new Vehicles({ registration_id,  name , image , price , type ,no_of_passengers , vehicle_trips,operators })
    vehiclesList
    .save()
    .then( () => res.json("Vehicles Added Successfully"))
    .catch((err) => res.status(400).json("Error: " + err))
}
module.exports = { getVehicles ,postVehicles}