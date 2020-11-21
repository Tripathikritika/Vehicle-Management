import actionConstant from './actionTypes'
import axios from 'axios'

export const operatorsRequest = () => ({
    type : actionConstant.OPERATORS_VEHICLE_REQUEST
})

export const operatorsSuccess = ( payload , total ) => ({
    type : actionConstant.OPERATORS_VEHICLE_SUCCESS,
    payload,
    total
})

export const operatorsFailure = () => ({
    type : actionConstant.OPERATORS_VEHICLE_FAILURE
})

export const getRequest = (payload,value,sortValue,filterValue) =>(dispatch) => {
    dispatch(operatorsRequest())
    axios.get(`http://localhost:5000/allVehicles/${payload}?sort=${sortValue}&filters=${filterValue}&page=${value}&limit=4`)
         .then((res) => {
            // console.log(res.data.totalCount)
            dispatch(operatorsSuccess(res.data.current,res.data.totalCount))
         })
         .catch((err) => {
            console.log(err)
            dispatch(operatorsFailure())
         })
}

export const operatorsPostRequest = () => ({
    type : actionConstant.OPERATORS_POST_VEHICLE_REQUEST
})

export const operatorsPostSuccess = ( payload ) => ({
    type : actionConstant.OPERATORS_POST_VEHICLE_SUCCESS,
    payload
})

export const operatorsPostFailure = () => ({
    type : actionConstant.OPERATORS_POST_VEHICLE_FAILURE
})

export const postRequest = (payload) =>(dispatch) => {
    // console.log({payload})
    dispatch(operatorsPostRequest())
    axios.post(`http://localhost:5000/vehicles`,{
        name : payload.name,
        price : payload.price,
        type :payload.type ,
        no_of_passengers : payload.no_of_passengers,
        vehicle_trips : payload.vehicle_trips,
        operators : payload.operators,
        image : payload.image
    })
        .then((res) => { 
        console.log(JSON.parse(res.config.data))
        // dispatch(operatorsPostSuccess(JSON.parse(res.config.data)))
        dispatch(getRequest())

        })
        .catch((err) => {
        console.log(err)
        dispatch(operatorsPostFailure())
        })
}