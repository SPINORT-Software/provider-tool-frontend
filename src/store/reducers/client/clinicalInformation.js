 // action - state management
import * as actionTypes from 'store/actionTypes';

export const initialState = {
    client: "",
    completion_date: new Date(),
    medical_diagnosis: [],
    home_support_services: [],
    current_medication: [],

    hospitalizations_six_months: "",
    hospitalizations_twelve_months: "",
    hospitalization_last_date: "",
    hospitalization_last_stay_length: "",
    hospitalization_last_medical_reason: "",

    emergency_room_count_six_months: "",
    emergency_room_count_twelve_months: "",
    emergency_room_last_date: new Date(),
    emergency_room_last_medical_reason:"",

    ambulance_use_six_months: "",
    ambulance_use_medical_reason_six_months: "",
    ambulance_use_twelve_months: "",
    ambulance_use_medical_reason_twelve_months: "",

    family_physician: "",
    nurse_practitioner: "",
    past_medical_history: "",
}

const clinicalInformationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_SET_CLINICAL_INFORMATION_DETAIL: {
            const clinicalInformationData = action.data;
            return {
                ...state,
                ...clinicalInformationData
            }
        }
        case actionTypes.CLIENT_SET_RETRIEVED_CLINICAL_INFORMATION_DATA: {
            const clinicalInformationData = action.data;
            return {
                ...state,
                ...clinicalInformationData
            }
        }
        default: {
            return {...state};
        }
    }
};

export default clinicalInformationReducer;

