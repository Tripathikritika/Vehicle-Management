import actionConstant from './actionTypes'

const initState = {
    isAuth : false,
    email : "",
    error : ''
}

const reducer = (state = initState , action) => {
    switch ( action.type) {
        case actionConstant.USER_LOGIN_REQUEST : 
            return {
                ...state,
                error : ""
            }
        case actionConstant.USER_LOGIN_SUCCESS : 
            return {
                ...state,
                email : action.payload,
                isAuth : true
            }
        case actionConstant.USER_LOGIN_FAILURE : 
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