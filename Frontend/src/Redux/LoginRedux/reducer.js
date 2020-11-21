import actionConstant from './actionTypes'
  
import {loadData, saveData } from "./localStorage";

const initState = {
    isAuth : loadData('isAuth') || false,
    email : loadData('email') || "",
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
        saveData('isAuth' , true )
        saveData('email' , action.payload )
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
            case actionConstant.USER_LOGOUT : 
            saveData('isAuth',false)
            saveData('email' , "" )
            return {
              ...state ,
              isAuth : false,
            }
    }
}


export default reducer