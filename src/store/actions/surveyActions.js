import axios from 'axios'
import { GET_ERRORS, GET_SURVEY, GET_SURVEYS } from './surveyTypes'


export const createSurvey = (survey, navigate) => async dispatch => {
    try {
        await axios.post('http://localhost:8000/survey_skeletons', survey)
        navigate.push('/dashboard')
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }

}

export const getSurveys = () => async dispatch=>{
    const res = await axios.get('http://localhost:8000/survey_skeletons')
    dispatch({
        type: GET_SURVEYS,
        payload: res.data
    })
}

export const getSurvey =(id)=>async dispatch=>{
    const res = await axios.get(`http://localhost:8000/survey_skeletons/${id}`)
    dispatch({
        type:GET_SURVEY,
        payload:res.data
    })
}