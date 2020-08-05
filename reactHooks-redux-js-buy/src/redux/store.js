import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import * as reducers from "./ducks"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers(reducers)
const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancer)

export default store
