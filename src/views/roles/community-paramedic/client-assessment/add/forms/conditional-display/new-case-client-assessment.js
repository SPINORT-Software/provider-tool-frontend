import React from 'react';

// material-ui
import {Autocomplete, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import ProviderSpecificForms from 'views/roles/common/provider-specific-forms';
import AssessmentFormsCP from 'views/roles/common/assessment-forms-cp';
import MaskedInput from 'react-text-mask';

// Redux
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    setNewEMAssessmentDetails,
    setNewEMProviderSpecificFormUUID,
    setNewEMGeneralAssessmentFormUUID
} from "store/actions/caseManager/clientAssessmentActions";

import MainCard from "ui-component/cards/MainCard";


const priorityProblemsList = [
    {label: 'Increased risk of falls (1 fall in 3 months)', id: 1},
    {label: 'Multiple co-morbidities (>3)', id: 2},
    {label: 'No primary care provider', id: 2},
    {label: 'No mode of transportation', id: 2},
    {label: 'Polypharmacy issues', id: 2},
    {label: 'Frequent 911 calls/ED visits', id: 2},
    {label: 'Recent discharge from hospital', id: 2},
    {label: 'Financial Vulnerabilities', id: 2},
    {label: 'Food insecurity', id: 2},
    {label: 'Social isolation or Living alone', id: 2},
    {label: 'Cognitive Impairment', id: 2},
    {label: 'Geographical Isolation', id: 2},
    {label: 'Mobility Compromise', id: 2},
    {label: 'No other support services', id: 2},
    {label: 'Safety concerns or hoarding', id: 2},
    {label: 'Unstable or precariously housed', id: 2},
    {label: 'Other', id: 23}
];

const clientInterventionsList = [
    {label: 'Increased risk of falls (1 fall in 3 months)', id: 1},
    {label: 'Alertness check (person, place, time)', id: 1},
    {label: 'Blood glucose check', id: 1},
    {label: 'Cap refill check', id: 1},
    {label: 'ECG', id: 1},
    {label: 'Education and health promotion', id: 1},
    {label: 'Falls risk assessment', id: 1},
    {label: 'Grip strength', id: 1},
    {label: 'Hospital discharge follow-up', id: 1},
    {label: 'Medication Reconciliation', id: 1},
    {label: 'Medication Education', id: 1},
    {label: 'Pupil Evaluation', id: 1},
    {label: 'Telemonitoring education / enrollment', id: 1},
    {label: 'Respiratory Assessment', id: 1},
    {label: 'Safety Checklist', id: 1},
    {label: 'Skin turgor evaluation', id: 1},
    {label: 'Social discussion (chat)', id: 1},
    {label: 'Swab testing', id: 1},
    {label: 'Symptom relief', id: 1},
    {label: 'Vaccination at home', id: 1},
    {label: 'Vital signs assessment - Blood pressure', id: 1},
    {label: 'Vital signs assessment - Pulse', id: 1},
    {label: 'Vital signs assessment - Heart Rate', id: 1},
    {label: 'Vital signs assessment - Respiration Rate', id: 1},
    {label: 'Vital signs assessment - Temperature', id: 1},
    {label: 'Vital signs assessment - Weight', id: 1},
    {label: 'Wellness check', id: 1},
    {label: 'Wound check', id: 1},
    {label: 'Other', id: 23}
];

const recommendationsList = [
    {label: 'Continue current routine visits - no changes required', id: 1},
    {label: 'Monitor vital signs', id: 1},
    {label: 'Increased visits', id: 1},
    {label: 'Lab Work', id: 1},
    {label: 'X-Ray', id: 1},
    {label: 'ECG', id: 1},
    {label: 'Case Manager Visit', id: 1},
    {label: 'Primary Provider Visit', id: 1},
    {label: 'Transfer to the hospital', id: 1},
    {label: 'Implement new care plan with EMP or External Case Manager', id: 1},
    {label: 'Other', id: 23}
];

const NewCaseClientAssessment = () => {

    const assessmentData = useSelector(state => state.caseManager.clientAssessment.add.assessment_type_data)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            date: assessmentData.date,
            total_time: assessmentData.total_time,
            mode_of_assessment: assessmentData.mode_of_assessment
        },
        validate: values => {
            dispatch(setNewEMAssessmentDetails(values));
        }
    });


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
                <SubCard title='Current Vital Signs'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="BP"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>


                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Pulse"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="HR"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="RR"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Temperature"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Weight"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Oximetry"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={4} md={12}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="O2 (liters/minute)"
                                    guide={false}

                                    onChange={formik.handleChange}
                                    name='date'
                                    id="date"
                                    value={formik.values.date}

                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                </SubCard>

            </Grid>

            <Grid item xs={12} sm={12} lg={12} md={12}>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} lg={8} md={12}>

                            <Autocomplete
                                multiple
                                options={priorityProblemsList}
                                // value={formik.values.organizations_upon_referral}
                                // getOptionLabel={(option) => option.label}
                                // onChange={(e, value) => {
                                //     formik.setFieldValue('organizations_upon_referral', value)
                                // }}

                                renderInput={(params) => <TextField {...params} label='Priority Problems'/>}
                                name='organizations_upon_referral'
                                id='organizations_upon_referral'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        pr: '30px !important'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} lg={6} md={12}>
                            <Autocomplete
                                multiple
                                options={clientInterventionsList}
                                // value={formik.values.organizations_upon_referral}
                                // getOptionLabel={(option) => option.label}
                                // onChange={(e, value) => {
                                //     formik.setFieldValue('organizations_upon_referral', value)
                                // }}

                                renderInput={(params) => <TextField {...params}
                                                                    label='Client Interventions'/>}
                                name='organizations_upon_referral'
                                id='organizations_upon_referral'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        pr: '30px !important'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} lg={6} md={12}>
                            <Autocomplete
                                multiple
                                options={recommendationsList}
                                // value={formik.values.organizations_upon_referral}
                                // getOptionLabel={(option) => option.label}
                                // onChange={(e, value) => {
                                //     formik.setFieldValue('organizations_upon_referral', value)
                                // }}

                                renderInput={(params) => <TextField {...params} label='Recommendations'/>}
                                name='organizations_upon_referral'
                                id='organizations_upon_referral'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        pr: '30px !important'
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default NewCaseClientAssessment;
