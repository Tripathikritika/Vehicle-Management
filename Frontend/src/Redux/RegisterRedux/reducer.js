import actionConstant from './actionTypes'

const initState = {
    isRegisterAuth : false,
    email : "",
    FName : "",
    LName : "",
    mobile : "",
    error : ''
}

const reducer = (state = initState , action) => {
    switch ( action.type) {
        case actionConstant.USER_REGISTER_REQUEST : 
            return {
                ...state,
                error : ""
            }
        case actionConstant.USER_REGISTER_SUCCESS : 
            return {
                ...state,
                email : action.payload,
                FName : action.payload,
                LName : action.payload,
                mobile : action.payload,
                isRegisterAuth : true
            }
        case actionConstant.USER_REGISTER_FAILURE : 
            return {
                ...state,
                error : action.payloads
            }
        default :
            return {
                ...state
            
            }
    }
}


export default reducer