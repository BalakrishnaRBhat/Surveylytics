import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import surveyReducer from "./reducers/surveyReducer";
const rootReducer = combineReducers({
    surveyReducer: surveyReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store