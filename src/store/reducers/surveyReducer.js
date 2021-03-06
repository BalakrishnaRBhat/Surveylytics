import { DELETE_SURVEY, GET_ERRORS, GET_SURVEY, GET_SURVEYS } from "../actions/surveyTypes";

const initialState = {
    surveys: [],
    survey: {}
}

const surveyReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ERRORS:
            return {
                ...state,
                surveys: action.payload
            }
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload
            }
        case GET_SURVEY: 
            return {
                ...state,
                survey: action.payload
            }
        case DELETE_SURVEY:
            return {
                ...state, 
                surveys: state.surveys.filter(item => item.id !== action.payload)
            }
        default: return state
    }
}

export default surveyReducer