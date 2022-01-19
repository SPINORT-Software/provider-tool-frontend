import React from 'react';

// material-ui
import {Autocomplete, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import TypeOfTherapeuticInterventions from './type-therapeutic-intervention';
import MaskedInput from 'react-text-mask';
import FileInput from '../../../common/file-input';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DatePicker from "@material-ui/lab/DatePicker";
import {setInterventionFormDetails, setInterventionDateAdd, setInterventionFormUUID} from "store/actions/caseManager/clientInterventionActions";

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

const InterventionDetails = ({providerProfessionType}) => {
    const clientInterventionAddData = useSelector(state => state.caseManager.clientIntervention.add.intervention)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            casemanager: '',
            client: clientInterventionAddData.client,
            date: clientInterventionAddData.date,
            total_time: clientInterventionAddData.total_time,
            mode_of_clinical_intervention: clientInterventionAddData.mode_of_clinical_intervention,
            therapeutic_type: clientInterventionAddData.therapeutic_type,
            clinical_type: clientInterventionAddData.clinical_type
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

            <Grid item xs={12} sm={12} lg={6} md={6}>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        renderInput={(props) => <TextField fullWidth {...props} />}
                        label="Date & Time"
                        value={formik.values.daily_workload_date}
                        name='daily_workload_date'
                        id="daily_workload_date"
                        format="YYYY-MM-DD"
                        onChange={handleInterventionDateChange}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} lg={6} md={6}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className='form-control'
                    label='Total time spent'
                    guide={false}
                    name='total_time'
                    id='total_time'
                    value={formik.values.total_time}
                    onChange={formik.handleChange}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue=''/>}
                />

            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={12} >
                <SubCard title='Mode of Clinical Intervention'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12}>
                                <TextField select
                                           label='Mode of Clinical Intervention'
                                           fullWidth
                                           name='mode_of_clinical_intervention'
                                           id='mode_of_clinical_intervention'
                                           value={formik.values.mode_of_clinical_intervention}
                                           onChange={formik.handleChange}
                                >
                                    {modeOfInterventionSelectList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id='client-reassessment-mode-of-assessment-other'
                                    type='text'
                                    fullWidth
                                    label='Other'
                                    defaultValue=''
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={8}>
                <SubCard title='Therapeutic Intervention'>
                    <CardContent>
                        <TypeOfTherapeuticInterventions id='therapeutic_type' value={formik.values.therapeutic_type} onChangeHandler={formik.handleChange}/>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8}>
                <SubCard title='Clinical Intervention'>
                    <CardContent>
                        <Autocomplete
                            multiple
                            options={providerTypeClinicalInterventionTypes[providerProfessionType]}
                            getOptionLabel={(option) => option.label}
                            name='clinical_type'
                            id='clinical_type'
                            renderInput={(params) => <TextField {...params} label='Clinical Intervention'/>}
                            onChange={(e, value) => {
                                formik.setFieldValue('clinical_type', value)
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    pr: '30px !important'
                                }
                            }}
                        />
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={12}>
                <SubCard title='Assessment Forms'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <FileInput title='EMP Progress Notes' setDocumentUUID={setInterventionFormUUID} fileType='TYPE_CASE_MANAGER_ASSESSMENT'/>

                            <FileInput title='Team Communication' setDocumentUUID={setInterventionFormUUID}
                                       fileType='TYPE_CASE_MANAGER_ASSESSMENT'/>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

        </Grid>
    );
};

export default InterventionDetails;
