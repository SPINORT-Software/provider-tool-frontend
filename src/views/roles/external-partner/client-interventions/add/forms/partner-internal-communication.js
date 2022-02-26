import React from 'react';

// material-ui
import {
    TextareaAutosize,
    Autocomplete,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import TypeOfTherapeuticInterventions from './type-therapeutic-intervention';
import MaskedInput from 'react-text-mask';
import FileInput from 'views/roles/common/file-input';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DatePicker from "@material-ui/lab/DatePicker";
import {
    setInterventionFormDetails,
    setInterventionDateAdd,
    setInterventionFormUUID
} from "store/actions/caseManager/clientInterventionActions";

const modeOfInterventionSelectList = [
    {
        value: 'in-person-home',
        label: 'In-Person Visit - Home'
    },
    {
        value: 'in-person-nursing-home',
        label: 'In-Person Visit - Nursing Home '
    },
    {
        value: 'in-person-residential-facility',
        label: 'In-Person Visit - Residential Facility '
    },
    {
        value: 'in-person-work',
        label: 'In-Person Visit - Work'
    },
    {
        value: 'in-person-other',
        label: 'In-Person Visit - Other'
    },
    {
        value: 'telephone',
        label: 'Telephone'
    },
    {
        value: 'videoconferencing',
        label: 'Videoconferencing'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const providerTypeClinicalInterventionTypes = {
    'PROVIDER_TYPE_NUTRITIONIST': [
        {label: 'Nutrition teaching', id: 'nutrition-teaching'},
        {label: 'Other', id: 'other'},
    ],
    'PROVIDER_TYPE_OCCUPATIONAL_THERAPIST': [
        {label: 'Equipment use education', id: 'equipment-use-education'},
        {label: 'Family support', id: 'family-support'},
        {label: 'Feeding practice', id: 'feeding-practice'},
        {label: 'Functional exercises', id: 'functional-exercises'},
        {label: 'Functional skills training', id: 'functional-skills-training'},
        {label: 'Furniture height modification', id: 'furniture-height-modification'},
        {label: 'Graded exercise therapy', id: 'graded-exercise-therapy'},
        {label: 'Modification of house', id: 'modification-of-house'},
        {label: 'Modification of wheelchair', id: 'modification-of-wheelchair'},
        {label: 'Safety in home', id: 'safety-in-home'},
    ],
    'PROVIDER_TYPE_PHYSICAL_THERAPIST': [
        {label: 'Rehabilitation and reablement', id: 'rehabilitation-and-reablement'},
        {label: 'Other', id: 'other'},
    ],
    'PROVIDER_TYPE_REGISTERED_NURSE': [
        {label: "Blood work", id: 'blood-work',},
        {label: "Chronic disease management", id: 'chronic-disease-management'},
        {label: "Central venous access device", id: 'central-venous-access-device'},
        {label: "Frailty", id: 'frailty'},
        {label: "General assessment", id: 'general-assessment'},
        {label: "Home oxygen", id: 'home-oxygen'},
        {label: "IV therapy", id: 'iv-therapy'},
        {label: "Medication management", id: 'medication-management'},
        {label: "Ostomy care", id: 'ostomy-care'},
        {label: "Point-of-Care (POC) diagnostic", id: 'point-of-care-diagnostic'},
        {label: "Post-operative care", id: 'post-operative-care'},
        {label: "Respiratory function", id: 'respiratory-function'},
        {label: "Remote patient monitoring", id: 'remote-patient-monitoring'},
        {label: "Tube feeding", id: 'tube-feeding'},
        {label: "Symptom management", id: 'symptom-management'},
        {label: "Wound care", id: 'wound-care'},
        {label: "Other", id: 'other'},
    ],
    'PROVIDER_TYPE_RESPIRATORY_THERAPIST': [
        {label: "Breathing exercises", id: 'breathing-exercises'},
        {label: "Other", id: 'other'},
    ],
    'PROVIDER_TYPE_SOCIAL_WORKER': [
        {label: "Advocacy", id: 'advocacy'},
        {label: "Anger Management", id: 'anger-management'},
        {label: "Adjustment Counselling", id: 'adjustment-counselling'},
        {label: "Bereavement Counselling", id: 'bereavement-counselling'},
        {label: "Consultation", id: 'consultation'},
        {label: "Couple Therapy", id: 'couple-therapy'},
        {label: "Crisis Intervention", id: 'crisis-intervention'},
        {label: "Diffusing / Debriefing", id: 'diffusing-bebriefing'},
        {label: "Education", id: 'education'},
        {label: "Family Therapy", id: 'family-therapy'},
        {label: "Grief Therapy", id: 'grief-therapy'},
        {label: "Group Therapy", id: 'group-therapy'},
        {label: "Individual Therapy", id: 'individual-therapy'},
        {label: "Locate and Arrange Resources", id: 'locate-and-arrange-resources'},
        {label: "Mediation", id: 'mediation'},
        {label: "Palliative Counselling", id: 'palliative-counselling'},
        {label: "Problem Solving", id: 'problem-solving'},
        {label: "Relaxation Techniques", id: 'relaxation-techniques'},
        {label: "Spiritual Counselling", id: 'spiritual-counselling'},
        {label: "Stress Management", id: 'stress-management'},
        {label: "Suicide Intervention", id: 'suicide-intervention'},
        {label: "Other: (textbox to specify)", id: 'other'}
    ],
    'PROVIDER_TYPE_SPEECH_LANGUAGE_THERAPIST': [
        {label: 'Communication Problems', id: 'communication-problems'},
        {label: 'Swallowing assessment', id: 'swallowing-assessment'},
        {label: 'Other', id: 'other'},
    ]
}

const PartnerInternalCommunication = ({providerProfessionType}) => {
    const clientInterventionAddData = useSelector(state => state.caseManager.clientIntervention.add)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            internal_comm_assessment_clinical_notes: clientInterventionAddData.internal_comm_assessment_clinical_notes,
            internal_comm_followup_clinical_notes: clientInterventionAddData.internal_comm_followup_clinical_notes,
            internal_comm_internal_referral_notes: clientInterventionAddData.internal_comm_internal_referral_notes,
        },
        validate: values => {
            dispatch(setInterventionFormDetails(values))
        }
    });

    const handleInterventionDateChange = (date) => {
        dispatch(setInterventionDateAdd(date))
    }

    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={12} lg={12} md={12}>


                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} lg={10} md={10}>
                        <SubCard title="Assessment">
                            <CardContent>
                                <TextField
                                    id="internal_comm_assessment_clinical_notes"
                                    variant="outlined"
                                    label="Clinical Notes"
                                    multiline
                                    rows={6}
                                    maxRows={15}
                                    fullWidth

                                />
                            </CardContent>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={10} md={10}>
                        <SubCard title="Follow-Up Discussions">
                            <CardContent>
                                <TextField
                                    id="internal_comm_followup_clinical_notes"
                                    variant="outlined"
                                    label="Clinical Notes"
                                    multiline
                                    rows={6}
                                    maxRows={15}
                                    fullWidth

                                />
                            </CardContent>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={10} md={10}>
                        <SubCard title="Internal Referral">
                            <CardContent>
                                <TextField
                                    id="internal_comm_internal_referral_notes"
                                    variant="outlined"
                                    label="Referral Notes"
                                    multiline
                                    rows={6}
                                    maxRows={15}
                                    fullWidth

                                />
                            </CardContent>
                        </SubCard>
                    </Grid>


                </Grid>
            </Grid>

        </Grid>
    );
};

export default PartnerInternalCommunication;
