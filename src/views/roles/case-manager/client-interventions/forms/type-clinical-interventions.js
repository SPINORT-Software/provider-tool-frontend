import React from 'react';

// material-ui
import {
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Card,
    Switch,
    Typography,
    Autocomplete
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import AssessmentForms from '../../../common/assessment-forms';
import MaskedInput from 'react-text-mask';

import {makeStyles} from '@material-ui/styles';
import ProviderGenericForm from "../../../common/provider-specific-forms/generic-form";
import FileInput from "../../../common/file-input";

import {connect, useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {setReferralDetails} from "../../../../../store/actions/reviewBoard/referralActions";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    }
}));

const TypeOfClinicalInterventions = () => {
    const classes = useStyles();
    const PROVIDER_TYPE = 'PROVIDER_TYPE_NUTRITIONIST';

    const getClinicalInterventionList = () => {
        const providerSpecificForms = {
            'PROVIDER_TYPE_NUTRITIONIST': [
                {label: 'Nutrition teaching', id: 1},
                {label: 'Other', id: 2},
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
    }

    const clinicalInterventionList = getClinicalInterventionList();

    const formik = useFormik({
        initialValues: {},
        validate: values => {
            console.log(values)
        }
    });

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={8} sm={8} lg={6} md={8}>
                        <Grid item container alignItems="center" justifyContent="space-between">

                            <Autocomplete
                                multiple
                                options={clinicalInterventionList}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} />}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        pr: '30px !important'
                                    }
                                }}

                                onChange={(e, value) => {
                                    formik.setFieldValue('clinical_type', value)
                                }}
                                value={formik.values.clinical_type}
                                name='clinical_type'
                                id='clinical_type'
                            />

                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default TypeOfClinicalInterventions;
