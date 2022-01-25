import React from 'react';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    CardContent,
    Button,
    Divider, FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem, Radio, RadioGroup, Slider,
    Switch,
    TextField,
    Typography, Autocomplete
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";
import JWTContext from "contexts/JWTContext";
import {useDispatch, useSelector} from "react-redux";

import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import SubCard from 'ui-component/cards/SubCard';
import {setAddDailyWorkLoadDate} from "../../../../store/actions/caseManager/dailyWorkloadActions";

const medicalDiagnosisList = [
    {label: 'Type', id: 1, group: 'Cancer'},

    {label: 'Cardiac-Congestive Heart Failure', id: 1, group: 'Cardiac'},
    {label: 'Cardiac-Hypertension', id: 1, group: 'Cardiac'},
    {label: 'Cardiac-Hypotension', id: 1, group: 'Cardiac'},
    {label: 'Cardiac-Hypercholesterolemia', id: 1, group: 'Cardiac'},
    {label: 'Cardiac-Other', id: 1, group: 'Cardiac'},

    {label: 'Circulatory-Deep Venous Thrombosis', id: 1, group: 'Circulatory'},
    {label: 'Circulatory-Other', id: 1, group: 'Circulatory'},

    {label: 'Integumentary-Shingles', id: 1, group: 'Integumentary'},
    {label: 'Integumentary-Rash', id: 1, group: 'Integumentary'},
    {label: 'Integumentary-Other', id: 1, group: 'Integumentary'},

    {label: 'Endocrine-Type II Diabetes Mellitus', id: 1, group: 'Endocrine'},
    {label: 'Endocrine-Other', id: 1, group: 'Endocrine'},

    {label: 'Eye-Macular Degeneration', id: 1, group: 'Eye'},
    {label: 'Eye-Other', id: 1, group: 'Eye'},

    {label: 'Specify', id: 1, group: 'Frailty'},

    {label: 'Specify', id: 1, group: 'Gastro-Intestinal'},

    {label: 'Musculoskeletal-Arthritis', id: 1, group: 'Musculoskeletal'},
    {label: 'Musculoskeletal-Osteoporosis', id: 1, group: 'Musculoskeletal'},
    {label: 'Musculoskeletal-Fractures', id: 1, group: 'Musculoskeletal'},
    {label: 'Musculoskeletal-Paget’s Disease of Bone', id: 1, group: 'Musculoskeletal'},
    {label: 'Musculoskeletal-Other', id: 1, group: 'Musculoskeletal'},

    {label: 'Neurological-Dementia', id: 1, group: 'Neurological'},
    {label: 'Neurological-Parkinson', id: 1, group: 'Neurological'},
    {label: 'Neurological-Epilepsy', id: 1, group: 'Neurological'},
    {label: 'Neurological-Multiple Sclerosis', id: 1, group: 'Neurological'},
    {label: 'Neurological-Stroke', id: 1, group: 'Neurological'},
    {label: 'Neurological-Motor Neuron Disease', id: 1, group: 'Neurological'},
    {label: 'Neurological-Other', id: 1, group: 'Neurological'},

    {label: 'Specify', id: 1, group: 'Obesity'},

    {label: 'Specify', id: 1, group: 'Post-Surgical Care'},

    {label: 'Genital-Urinary-Chronic Kidney Disease', id: 1, group: 'Genital-Urinary'},
    {label: 'Genital-Urinary-Dialysis', id: 1, group: 'Genital-Urinary'},
    {label: 'Genital-Urinary-Other', id: 1, group: 'Genital-Urinary'},

    {label: 'Respiratory-Asthma', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Chronic Obstructive Pulmonary Disease (COPD)', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Chronic Bronchitis', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Emphysema', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Sleep Apnea', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Pneumonia', id: 1, group: 'Respiratory'},
    {label: 'Respiratory-Other', id: 1, group: 'Respiratory'},

    {label: 'Type', id: 1, group: 'Substance Abuse'},
]

const homeSupportServicesList = [
    {label: 'Informal Support-Immediate Family', id: 1, group: 'Informal Support'},
    {label: 'Informal Support-Extended Family', id: 1, group: 'Informal Support'},
    {label: 'Informal Support-Friends or Neighbors', id: 1, group: 'Informal Support'},
    {label: 'Informal Support-Other', id: 1, group: 'Informal Support'},

    {label: 'Formal Support-Ability NB', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Ambulatory Clinic (Outpatient)', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Ambulance New Brunswick (ANB)', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Community Health Centers', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Specify: Nurse Practitioner or Family Physician', id: 1, group: 'Formal Support'},

    {label: 'Formal Support-Department of Veteran Affairs', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Emergency Department', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Extra-Mural Program', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Family Physician (Outside Community Health Centers)', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-First Nations', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Homecare Agency', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Hospital (Inpatient)', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Nursing Home', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Public Health Services', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Residential Facility', id: 1, group: 'Formal Support'},
    {label: 'Formal Support-Self-referral or Referral by Family Member', id: 1, group: 'Formal Support'},

    {label: 'Formal Support-Social Development', id: 1, group: 'Formal Support-Social Development'},
    {
        label: 'Formal Support-Home Adaptations for Seniors Independence Program',
        id: 1,
        group: 'Formal Support-Social Development'
    },
    {label: 'Homeowner Repair Program', id: 1, group: 'Formal Support-Social Development'},
    {label: 'Housing Program', id: 1, group: 'Formal Support-Social Development'},
    {label: 'Long-Term Care Program', id: 1, group: 'Formal Support-Social Development'},
    {label: 'Mobility and Adaptive Equipment Loan Program', id: 1, group: 'Formal Support-Social Development'},
    {label: 'Social Assistance Program', id: 1, group: 'Formal Support-Social Development'},
    {label: 'Other', id: 1, group: 'Formal Support-Social Development'},

    {label: 'Specify', id: 1, group: 'Volunteer Organizations'},

    {label: 'Specify', id: 1, group: 'Other'},
]


const ClinicalInformation = ({setClinicalInformationDetails}) => {
    const theme = useTheme();
    const userAuthContext = React.useContext(JWTContext)
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch()
    const {
        user: {
            user_type_pk: clientUUID
        }
    } = userAuthContext;

    const formik = useFormik({
        initialValues: {
            completion_date: clinicalInfoData.completion_date,
            medical_diagnosis: clinicalInfoData.medical_diagnosis,
            home_support_services: clinicalInfoData.home_support_services,
            nurse_practitioner: clinicalInfoData.nurse_practitioner,
            family_physician: clinicalInfoData.family_physician,
        },
        validate: values => {
            dispatch(setClinicalInformationDetails(values))
        }
    });
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={4} lg={12}>

                            <SubCard>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>

                                        <Grid item xs={4} lg={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                                    label="Date of Completion"
                                                    value={formik.values.daily_workload_date}
                                                    name='completion_date'
                                                    id="completion_date"
                                                    format="YYYY-MM-DD"
                                                    onChange={(date) => {
                                                        dispatch(setClinicalInformationDetails({
                                                            completion_date: date
                                                        }))
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} sm={12} lg={6} md={12}>
                            <SubCard title='Medical Diagnosis and/or Client Health Concerns (select all that apply)'>
                                <CardContent>
                                    <Autocomplete
                                        multiple
                                        options={medicalDiagnosisList}
                                        getOptionLabel={(option) => option.label}
                                        groupBy={(option) => String(option.group)}
                                        renderInput={(params) => <TextField {...params}
                                                                            label='Medical Diagnosis'/>}
                                        name='medical_diagnosis'
                                        id='medical_diagnosis'
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                pr: '30px !important'
                                            }
                                        }}
                                        onChange={(e, value) => {
                                            formik.setFieldValue('medical_diagnosis', value)
                                        }}
                                    />
                                </CardContent>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12} sm={12} lg={6} md={12}>
                            <SubCard title='Current Home Support Services (select all that apply)'>
                                <CardContent>
                                    <Autocomplete
                                        multiple
                                        options={homeSupportServicesList}
                                        getOptionLabel={(option) => option.label}
                                        groupBy={(option) => String(option.group)}
                                        renderInput={(params) => <TextField {...params}
                                                                            label='Home Support Services'/>}
                                        name='home_support_services'
                                        id='home_support_services'
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                pr: '30px !important'
                                            }
                                        }}
                                        onChange={(e, value) => {
                                            formik.setFieldValue('home_support_services', value)
                                        }}
                                    />
                                </CardContent>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12} md={12} lg={12}>
                            <SubCard >
                                <CardContent>

                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={6}>
                                            <TextField
                                                fullWidth
                                                label="Name of your Family Physician"
                                                value={formik.values.family_physician}
                                                id='family_physician'
                                                name='family_physician'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={4} lg={6}>
                                            <TextField
                                                fullWidth
                                                label="Name of your Nurse Practitioner"
                                                value={formik.values.nurse_practitioner}
                                                id='nurse_practitioner'
                                                name='nurse_practitioner'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>


                                </CardContent>
                            </SubCard>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ClinicalInformation;
