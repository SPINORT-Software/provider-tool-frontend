// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

export const provider_types_value_label_list = [
    {
        value: 'PROVIDER_TYPE_LICENSED_PRACTICAL_NURSE',
        label: 'Licensed Practical Nurse'
    },
    {
        value: 'PROVIDER_TYPE_NUTRITIONIST',
        label: 'Nutritionist'
    },
    {
        value: 'PROVIDER_TYPE_OCCUPATIONAL_THERAPIST',
        label: 'Occupational Therapist'
    },
    {
        value: 'PROVIDER_TYPE_PHYSICAL_THERAPIST',
        label: 'Physical Therapist'
    },
    {
        value: 'PROVIDER_TYPE_REGISTERED_NURSE',
        label: 'Registered Nurse'
    },
    {
        value: 'PROVIDER_TYPE_RESPIRATORY_THERAPIST',
        label: 'Respiratory Therapist'
    },
    {
        value: 'PROVIDER_TYPE_SOCIAL_WORKER',
        label: 'Social Worker'
    },
    {
        value: 'PROVIDER_TYPE_SPEECH_LANGUAGE_THERAPIST',
        label: 'Speech and Language Therapist'
    },
]

export const provider_types_followup_value_label_list = [
    {
        value: 'PROVIDER_TYPE_ADMINISTRATION',
        label: 'Administration'
    },
    {
        value: 'PROVIDER_TYPE_LICENSED_PRACTICAL_NURSE',
        label: 'Licensed Practical Nurse'
    },
    {
        value: 'PROVIDER_TYPE_NUTRITIONIST',
        label: 'Nutritionist'
    },
    {
        value: 'PROVIDER_TYPE_OCCUPATIONAL_THERAPIST',
        label: 'Occupational Therapist'
    },
    {
        value: 'PROVIDER_TYPE_PHYSICAL_THERAPIST',
        label: 'Physical Therapist'
    },
    {
        value: 'PROVIDER_TYPE_REGISTERED_NURSE',
        label: 'Registered Nurse'
    },
    {
        value: 'PROVIDER_TYPE_RESPIRATORY_THERAPIST',
        label: 'Respiratory Therapist'
    },
    {
        value: 'PROVIDER_TYPE_SOCIAL_WORKER',
        label: 'Social Worker'
    },
    {
        value: 'PROVIDER_TYPE_SPEECH_LANGUAGE_THERAPIST',
        label: 'Speech and Language Therapist'
    },
    {
        value: 'PROVIDER_TYPE_DEFAULT',
        label: 'Other'
    },
]

export const organizations_value_label_list = [
    {label: 'Ability NB', value: 'ORGANIZATION_ABILITY_NB'},
    {label: 'Ambulatory Clinic (Outpatient)', value: 'ORGANIZATION_AMBULATORY_CLINIC'},
    {label: 'Ambulance New Brunswick (ANB)', value: 'ORGANIZATION_AMBULANCE_NEW_BRUNSWICK'},
    {label: 'Community Health Centers', value: 'ORGANIZATION_COMMUNITY_HEALTH_CENTERS'},
    {label: 'Department of Veteran Affairs', value: 'ORGANIZATION_DEPARTMENT_OF_VETERAN_AFFAIRS'},
    {label: 'Emergency Department', value: 'ORGANIZATION_EMERGENCY_DEPARTMENT'},
    {label: 'Extra-Mural Program', value: 'ORGANIZATION_EXTRA_MURAL_PROGRAM'},
    {
        label: 'Family Physician (Outside Community Health Centers)',
        value: 'ORGANIZATION_FAMILY_PHYSICIAN_OUTSIDE_COMMUNITY_HEALTH_CENTERS'
    },
    {label: 'First Nations', value: 'ORGANIZATION_FIRST_NATIONS'},
    {label: 'Homecare Agency', value: 'ORGANIZATION_HOMECARE_AGENCY'},
    {label: 'Hospital (Inpatient)', value: 'ORGANIZATION_HOSPITAL_INPATIENT'},
    {label: 'Nursing Home', value: 'ORGANIZATION_NURSING_HOME'},
    {label: 'Public Health Services', value: 'ORGANIZATION_PUBLIC_HEALTH_SERVICES'},
    {label: 'Residential Facility', value: 'ORGANIZATION_RESIDENTIAL_FACILITY'},
    {label: 'Social Development', value: 'ORGANIZATION_SOCIAL_DEVELOPMENT'},
];

export const mode_of_communication_value_label_list = [
    {label: 'Dashboard', value: '0'},
    {label: 'Email', value: '1'},
    {label: 'Fax', value: '2'},
    {label: 'In Person', value: '3'},
    {label: 'Telephone', value: '4'},
    {label: 'Text Message', value: '5'},
    {label: 'Video Conference', value: '6'},
    {label: 'Other', value: '7'},
];

export const SHARE_COMMUNICATION_MODE = {
    DASHBOARD: 0,
    EMAIL: 1,
    FAX: 2,
    IN_PERSON: 3,
    TELEPHONE: 4,
    TEXT_MESSAGE: 5,
    VIDEO_CONFERENCE: 6,
    OTHER: 7
};

export const SHARE_INSTANCE_TYPE = {
    ClinicianClientAssessment: 1,
    CaseManagerClientAssessment: 2,
    ClientIntervention: 3,
    ClinicianClientInterventions: 4
}

export const SHARE_COMMUNICATION_TYPE = {
    INTERNAL_REFERRAL: 0,
    EXTERNAL_REFERRAL: 1,
    INTERNAL_FOLLOWUP: 2,
    EXTERNAL_FOLLOWUP: 3,
    DEFAULT: 4
}


/*
 * ================================================
 * Search Constants
 * ================================================
 */

export const userSearchParamsForInternalReferralAndFollowUp = {
    provider_type: '',
}

export const userSearchParamsForExternalReferralAndFollowUp = {
    organization: '',
}

