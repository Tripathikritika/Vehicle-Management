import actionConstant from './actionTypes'
import axios from 'axios'

export const loginRequest = ( ) => ({
    type : actionConstant.USER_LOGIN_REQUEST
})

export const loginSuccess = ( payload) => ({
    type : actionConstant.USER_LOGIN_SUCCESS,
    payload
})

export const loginFailure = (payload) => ({
    type : actionConstant.USER_LOGIN_FAILURE,
    payload
})

export const postLogin = (payload) => (dispatch) => {
    dispatch(loginRequest())
    axios.post(`http://localhost:5000/login`,{
        email : payload.email,
        password : payload.password
    })
         .then((res) => {
            // console.log(JSON.parse(res.config.data).email)
            dispatch(loginSuccess(JSON.parse(res.config.data).email))
         })
         .catch((err) => {
            console.log(err.response.data)
            dispatch(loginFailure(err.response.data))
         })

}
