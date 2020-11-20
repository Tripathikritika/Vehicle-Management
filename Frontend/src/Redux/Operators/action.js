import actionConstant from './actionTypes'
import axios from 'axios'

export const operatorsRequest = () => ({
    type : actionConstant.OPERATORS_VEHICLE_REQUEST
})

export const operatorsSuccess = ( payload ) => ({
    type : actionConstant.OPERATORS_VEHICLE_SUCCESS,
    payload
})

export const operatorsFailure = () => ({
    type : actionConstant.OPERATORS_VEHICLE_FAILURE
})

export const getRequest = (payload) =>(dispatch) => {
    dispatch(operatorsRequest())
    axios.get(`http://localhost:5000/allVehicles`)
         .then((res) => {
            console.log(res.data)
            dispatch(operatorsSuccess(res.data))
         })
         .catch((err) => {
            console.log(err)
            dispatch(operatorsFailure())
         })
}