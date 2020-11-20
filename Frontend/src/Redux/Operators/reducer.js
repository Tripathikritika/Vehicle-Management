import actionConstant from './actionTypes'

const initState = {
    vehicleArray : []
}

const reducer = ( state = initState , action) => {
    switch ( action.type ){
        case actionConstant.OPERATORS_VEHICLE_REQUEST :
            return {
                ...state
            }
        case actionConstant.OPERATORS_VEHICLE_SUCCESS :
            return {
                ...state,
                vehicleArray : action.payload
            }
        case actionConstant.OPERATORS_VEHICLE_FAILURE :
            return {
                ...state
            }
        default : 
            return {
                ...state
            }
    }
}

export default reducer