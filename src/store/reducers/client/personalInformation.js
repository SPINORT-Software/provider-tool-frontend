// action - state management
import * as actionTypes from 'store/actionTypes';
import {
    CLIENT_SET_PERSONAL_INFORMATION_DETAIL,
    CLIENT_SET_RETRIEVED_PERSONAL_INFORMATION_DATA
} from "store/actionTypes";

export const initialState = {
    client: "",
    date_of_birth: "",
    gender: "",
    ethnic_background: "",
    ethnic_background_detail: "",
    language_proficiency: [],
    language_proficiency_other: "",
    marital_status: "",
    marital_status_detail: "",
    family_situation: "",
    family_situation_detail: "",
    education: "",
    education_detail: "",
    employment: "",
    employment_detail: "",
    household_income: "",
    household_income_detail: "",
    housing_situation: "",
    housing_situation_detail: "",
    home_safety_assessment: {}
}


const personalInformationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_SET_PERSONAL_INFORMATION_DETAIL: {
            const personalInformationData = action.data;
            return {
                ...state,
                ...personalInformationData
            }
        }
        case actionTypes.CLIENT_SET_RETRIEVED_PERSONAL_INFORMATION_DATA: {
            const personalInformationData = action.data;
            return {
                ...state,
                ...personalInformationData
            }
        }
        case actionTypes.CLIENT_SET_HOME_SAFETY_ASSESSMENT_DETAIL: {
            const homeSafetyAssessmentData = action.data;
            return {
                ...state,
                ...homeSafetyAssessmentData
            }
        }
        default: {
            return {...state};
        }
    }
};

export default personalInformationReducer;
