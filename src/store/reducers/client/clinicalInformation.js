 // action - state management
import * as actionTypes from 'store/actionTypes';

export const initialState = {
    client: "",
    medical_diagnosis: {
        cancer: "",
        cardiac: "",
        cardiac_detail: "",
        circulatory: "",
        circulatory_detail: "",
        integumentary: "",
        integumentary_detail: "",
        endocrine: "",
        endocrine_detail: "",
        eye: "",
        eye_detail: "",
        frailty: "",
        gastro_intestinal: "",
        musculoskeletal: "",
        musculoskeletal_detail: "",
        neurological: "",
        neurological_detail: "",
        obesity: "",
        post_surgical: "",
        genital_urinary: "",
        genital_urinary_detail: "",
        respiratory: "",
        respiratory_detail : "",
        substance_abuse : ""
    },
    home_support_services: {
        informal_support:"",
        informal_support_detail: "",
        formal_support: "",
        formal_support_detail: ""
    },
    last_hospitalization: {
        hospitalizations_six_months: "",
        hospitalizations_twelve_months: "",
        hospitalization_last_date: "",
        hospitalization_last_stay_length: "",
        hospitalization_last_medical_reason: ""
    },
    emergency_room_visits: {
        emergency_room_count_six_months: "",
        emergency_room_count_twelve_months: "",
        emergency_room_last_date: "",
        emergency_room_last_medical_reason:""
    },
    ambulance_use: {
        ambulance_use_six_months: "",
        ambulance_use_medical_reason_six_months: "",
        ambulance_use_twelve_months: "",
        ambulance_use_medical_reason_twelve_months: ""
    },
    family_physician: "",
    nurse_practitioner: "",
    past_medical_history: "",
    current_medication: []
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
        default: {
            return {...state};
        }
    }
};

export default clinicalInformationReducer;

