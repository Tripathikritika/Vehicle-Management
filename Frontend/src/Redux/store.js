import { createStore , combineReducers , applyMiddleware , compose }  from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './LoginRedux/reducer'
import registerReducer from './RegisterRedux/reducer'
import operatorReducer from './Operators/reducer'
let composeEnhancers = compose

const rootReducer = combineReducers( { loginReducer,registerReducer ,operatorReducer})

if( process.env.NODE_END !== 'production'){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore( rootReducer , enhancer)

export default store