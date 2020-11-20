import actionConstant from './actionTypes'
import axios from 'axios'

export const registerRequest = ( ) => ({
    type : actionConstant.USER_REGISTER_REQUEST
})

export const registerSuccess = ( payload) => ({
    type : actionConstant.USER_REGISTER_SUCCESS,
    payload
})

export const registerFailure = (payload) => ({
    type : actionConstant.USER_REGISTER_FAILURE,
    payload
})

export const postregister = (payload) => (dispatch) => {
    console.log(payload)
    dispatch(registerRequest())

    axios.post(`http://localhost:5000/register`,{
        fName : payload.fName,
        lName : payload.lName,
        mobile : payload.mobile,
        email : payload.email,
        password : payload.password,
    })
         .then((res) => {
            console.log(res)
            dispatch(registerSuccess(res))
         })
         .catch((err) => {
            console.log(err)
            dispatch(registerFailure(err))
         })

}
