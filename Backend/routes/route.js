const express = require( 'express')
const router = express.Router()
const { getVehicles } = require('../controllers/vehicle_controller')
const { Registration , Login } = require('../controllers/operator_controller')

router.get( '/allVehicles' , getVehicles )

router.post('/register',Registration)
router.post('/login', Login)

module.exports = router