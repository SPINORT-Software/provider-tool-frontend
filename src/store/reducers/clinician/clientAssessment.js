import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: {},
    add: {
        assessment: {
            assessment_status: false,
            clinician: "",
            client: ""
        },
        assessment_type_data: {
            date: "",  // [OPTION 3]
            total_time: "", // [OPTION 3]
            mode_of_assessment: "", // [OPTION 3]

            existing_assessment: {  // [OPTION 1 - only this]  [OPTION 2]
                data: {
                    date: ""
                }
            },
            reassessment: { // [OPTION 4 - only this]  [OPTION 2]
                data: {
                    date: "",
                    reason: "",
                    total_time: "",
                    mode_of_assessment: ""
                }
            }
        },
        assessment_type_forms: {
            provider_specific_forms: [],
            assessment_forms: [],

            existing_assessment: {
                provider_specific_forms: [],
                assessment_forms: [],
            },
            reassessment: {
                provider_specific_forms: [],
                assessment_forms: [],
            }
        },
    },
    update: {},
    retrieve: {}
}


const clientAssessmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_CLIENT_STATUS: {
            const clientAssessmentStatus = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment: {
                        ...state.add.assessment,
                        assessment_status: clientAssessmentStatus
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_CLIENT_DETAIL: {
            const clientUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment: {
                        ...state.add.assessment,
                        client: clientUUID
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_CLINICIAN_DETAIL: {
            const clinicianUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment: {
                        ...state.add.assessment,
                        clinician: clinicianUUID
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_NON_TYPE_DATA: {
            const assessmentNonTypeData = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment: {
                        ...state.add.assessment,
                        ...assessmentNonTypeData
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_REASSESSMENT_DETAILS: {
            const reAssessmentData = action.data;

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_data: {
                        ...state.add.assessment_type_data,
                        reassessment: {
                            data: {
                                ...state.add.assessment_type_data.reassessment.data,
                                ...reAssessmentData
                            }
                        }
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_NEWEM_ASSESSMENT_DETAILS: {
            const newEmAssessmentData = action.data;

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_data: {
                        ...state.add.assessment_type_data,
                        ...newEmAssessmentData
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_EXISTINGEM_ASSESSMENT_DETAILS: {
            const existingEMAssessmentData = action.data;

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_data: {
                        ...state.add.assessment_type_data,
                        existing_assessment: {
                            data: {
                                ...existingEMAssessmentData
                            }
                        }
                    }
                }
            };
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_NEWEM_PROVIDER_SPECIFIC_FORM_UUID: {
            const providerSpecificFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        provider_specific_forms: [providerSpecificFormUUID]
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_NEWEM_GENERAL_ASSESSMENT_FORM_UUID: {
            const generalAssessmentFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        assessment_forms: [...state.add.assessment_type_forms.assessment_forms, generalAssessmentFormUUID]
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_PROVIDER_SPECIFIC_FORM_UUID: {
            const providerSpecificFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        existing_assessment: {
                            ...state.add.assessment_type_forms.existing_assessment,
                            provider_specific_forms: [
                                providerSpecificFormUUID
                            ]
                        }
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_GENERAL_ASSESSMENT_FORM_UUID: {
            const generalAssessmentFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        existing_assessment: {
                            ...state.add.assessment_type_forms.existing_assessment,
                            assessment_forms: [
                                ...state.add.assessment_type_forms.existing_assessment.assessment_forms,
                                generalAssessmentFormUUID
                            ]
                        }
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_PROVIDER_SPECIFIC_FORM_UUID: {
            const providerSpecificFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        reassessment: {
                            ...state.add.assessment_type_forms.reassessment,
                            provider_specific_forms: [
                                providerSpecificFormUUID
                            ]
                        }
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_GENERAL_ASSESSMENT_FORM_UUID: {
            const generalAssessmentFormUUID = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    assessment_type_forms: {
                        ...state.add.assessment_type_forms,
                        reassessment: {
                            ...state.add.assessment_type_forms.reassessment,
                            assessment_forms: [
                                ...state.add.assessment_type_forms.reassessment.assessment_forms,
                                generalAssessmentFormUUID
                            ]
                        }
                    }
                }
            }
        }

        case actionTypes.CLINICIAN_LIST_CLIENT_ASSESSMENT_FOR_CLINICIAN: {
            const clientAssessmentlistData = action.data;

            return {
                ...state,
                list: {
                    ...state.list,
                    ...clientAssessmentlistData
                }
            }
        }

        case actionTypes.CLINICIAN_SET_RETRIEVED_CLIENT_ASSESSMENT_DATA: {
            const {assessmentUUID, retrievedAssessmentData} = action.data

            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    [assessmentUUID]: {
                        ...retrievedAssessmentData
                    }
                }
            }
        }

        default: {
            return {...state};
        }
    }
};

export default clientAssessmentReducer;
