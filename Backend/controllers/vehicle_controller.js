const Vehicles = require('../models/vehicle_model')

const getVehicles =async ( req , res ) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const sortArray = req.query.sort === "Asc" ? 1 : req.query.sort === 'Desc' ? -1 : 0
    const filterArray = req.query.filters === 'Car' ? 'Car' : req.query.filters === 'Bus' ? 'Bus' : req.query.filters === 'Auto Ricksaw' ? "Auto Ricksaw" : req.query.filters ==="Bike" ? "Bike" : null
    const filteredData = {operators:req.params.email}
    if(filterArray){
        filteredData['type'] = filterArray
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalCount = await Vehicles.countDocuments({operators : req.params.email}).exec()

    if (endIndex < (await Vehicles.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        };
    }

    try{
        results.current = await  Vehicles.find(filteredData).sort({no_of_passengers : sortArray}).limit(limit).skip(startIndex).exec()
        res.json(results)
    }
    catch(e){
        res.status(500).json( { message : e.jmessage})
    }

}

const postVehicles = ( req , res ) => {
    // console.log(req.body)
    const registration_id = Vehicles.length + 1
    const { name , image , price , type ,no_of_passengers , vehicle_trips,operators} = req.body
    const vehiclesList = new Vehicles({name  , image ,price , type ,no_of_passengers , vehicle_trips,operators })
    vehiclesList
    .save()
    .then( () => res.json("Vehicles Added Successfully"))
    .catch((err) => res.status(400).json("Error: " + err))
}
module.exports = { getVehicles ,postVehicles}