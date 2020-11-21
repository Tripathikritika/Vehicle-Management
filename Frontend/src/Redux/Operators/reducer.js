import actionConstant from './actionTypes'

const initState = {
    vehicleArray : [],
    total_count : 0
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
                vehicleArray : action.payload,
                total_count : action.total
            }
        case actionConstant.OPERATORS_VEHICLE_FAILURE :
            return {
                ...state
            }
        case actionConstant.OPERATORS_POST_VEHICLE_REQUEST :
            return {
                ...state
            }
        case actionConstant.OPERATORS_POST_VEHICLE_SUCCESS :
            return {
                ...state,
                vehicleArray :[...state.vehicleArray, action.payload]
            }
        case actionConstant.OPERATORS_POST_VEHICLE_FAILURE :
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