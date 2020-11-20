const Vehicles = require('../models/vehicle_model')

const getVehicles = ( req , res ) => {
    Vehicles.find()
            .then((item) => res.status(200).json(item))
            .catch((err) => res.status(400).json( { message : "Failed To Find from BackEnd"}))
}

module.exports = { getVehicles }