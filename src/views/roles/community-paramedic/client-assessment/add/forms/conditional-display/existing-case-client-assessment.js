import React from 'react';

// material-ui
import {
    Autocomplete,
    CardContent,
    Checkbox, Divider, FormControl,
    FormControlLabel,
    Grid,
    MenuItem, Radio, RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';

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

import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';


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

const mentalStatusChangesList = [
    {label: 'Increased confusion', id: 1},
    {label: 'New or worsening behavioral symptoms', id: 1},
    {label: 'Decreased consciousness (sleepy, lethargic', id: 1},
    {label: 'Unresponsiveness', id: 1},
    {label: 'Other symptoms or signs of delirium (e.g. inability to pay attention, disorganized thinking)', id: 1},
]

const functionalStatusChanges = [
    {label: 'Needs more assistance with ADLs', id: 1},
    {label: 'Decreased mobility', id: 1},
    {label: 'Fall', id: 1},
    {label: 'Other (describe)', id: 1},
    {label: 'Weakness or hemiparesis', id: 1},
    {label: 'Slurred speech', id: 1},
    {label: 'Trouble swallowing', id: 1},
]


const respiratoryChanges = [
    {label: 'Shortness of breath', id: 1},
    {label: 'Cough - Non-productive', id: 1},
    {label: 'Cough - Productive', id: 1},
    {label: 'Abnormal lung sounds', id: 1},
    {label: 'Labored breathing', id: 1},
]

const abdomenChanges = [
    {label: 'Nausea', id: 1},
    {label: 'Vomiting', id: 1},
    {label: 'Diarrhea', id: 1},
    {label: 'Decreased appetite', id: 1},
    {label: 'Abdominal pain', id: 1},
    {label: 'Distended abdomen', id: 1},
    {label: 'Tenderness', id: 1},
]

const urineChanges = [
    {label: 'Decreased urine output', id: 1},
    {label: 'Painful urination', id: 1},
    {label: 'Urinating more frequently', id: 1},
    {label: 'Needs to urinate more urgently', id: 1},
    {label: 'Blood in urine', id: 1},
    {label: 'Change in urine appearance', id: 1},
    {label: 'Change in smell', id: 1},
    {label: 'New or worsening incontinence', id: 1},
]


// o Date of last BM: (textbox to specify)

const ExistingCaseClientAssessment = () => {

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
                <MainCard>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} lg={6} md={12}>

                                <Typography variant="subtitle1">Has there been a change in the clients
                                    condition</Typography>
                                <Divider/>

                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label="change-in-client-condition"
                                        name='change-in-client-condition'
                                    >
                                        <FormControlLabel
                                            value='change-client-condition-yes'
                                            control={
                                                <Radio/>
                                            }
                                            label="Yes"
                                        />

                                        <FormControlLabel
                                            value='change-client-condition-no'
                                            control={
                                                <Radio/>
                                            }
                                            label="No"
                                        />

                                        <FormControlLabel
                                            value='change-client-condition-na'
                                            control={<Radio/>}
                                            label="N/A"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Divider/>

                            </Grid>


                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={20}
                                    name='person_completing_detail'
                                    id='person_completing_detail'
                                    label='Change in the condition, symptoms, or signs is/are:'
                                    value={formik.values.person_completing_detail}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={6} md={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        renderInput={(props) => <TextField fullWidth {...props} />}
                                        label="Changes were perceived on:"
                                        value={formik.values.daily_workload_date}
                                        name='daily_workload_date'
                                        id="daily_workload_date"
                                        format="YYYY-MM-DD"
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={20}
                                    name='person_completing_detail'
                                    id='person_completing_detail'
                                    label='Things that make the condition or symptom worse are:'
                                    value={formik.values.person_completing_detail}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={20}
                                    name='person_completing_detail'
                                    id='person_completing_detail'
                                    label='Things that make the condition or symptom better are:'
                                    value={formik.values.person_completing_detail}
                                    onChange={formik.handleChange}
                                />
                            </Grid>


                            <Grid item xs={12} sm={12} lg={12} md={12}>

                                <Typography variant="subtitle1">This condition, symptom, or sign has occurred
                                    before:</Typography>
                                <Divider/>

                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-label="change-in-client-condition"
                                        name='change-in-client-condition'
                                    >
                                        <FormControlLabel
                                            value='change-client-condition-yes'
                                            control={
                                                <Radio/>
                                            }
                                            label="Yes"
                                        />

                                        <FormControlLabel
                                            value='change-client-condition-no'
                                            control={
                                                <Radio/>
                                            }
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Divider/>

                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={20}
                                    name='person_completing_detail'
                                    id='person_completing_detail'
                                    label='Treatment for last episode (if applicable):'
                                    value={formik.values.person_completing_detail}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={20}
                                    name='person_completing_detail'
                                    id='person_completing_detail'
                                    label='Other relevant information:'
                                    value={formik.values.person_completing_detail}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>

            <Grid item xs={12} sm={12} lg={12} md={12}>
                <MainCard>
                    <CardContent>
                        <SubCard
                            title='Complete only those relevant to the change in condition. If the item is not relevant, check ‘N/A’ for not applicable.'>
                            <CardContent>
                                <Grid container spacing={gridSpacing}>

                                    <Grid item xs={12} sm={12} lg={4} md={12}>

                                        <Autocomplete
                                            multiple
                                            options={mentalStatusChangesList}
                                            renderInput={(params) => <TextField {...params}
                                                                                label='Mental Status Changes'/>}
                                            name='organizations_upon_referral'
                                            id='organizations_upon_referral'
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pr: '30px !important'
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} lg={4} md={12}>
                                        <Autocomplete
                                            multiple
                                            options={functionalStatusChanges}
                                            renderInput={(params) => <TextField {...params}
                                                                                label='Functional Status Changes'/>}
                                            name='organizations_upon_referral'
                                            id='organizations_upon_referral'
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pr: '30px !important'
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} lg={4} md={12}>
                                        <Autocomplete
                                            multiple
                                            options={respiratoryChanges}
                                            renderInput={(params) => <TextField {...params}
                                                                                label='Respiratory Changes'/>}
                                            name='organizations_upon_referral'
                                            id='organizations_upon_referral'
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pr: '30px !important'
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} lg={4} md={12}>
                                        <Autocomplete
                                            multiple
                                            options={abdomenChanges}
                                            renderInput={(params) => <TextField {...params}
                                                                                label='GI/Abdomen Changes'/>}
                                            name='organizations_upon_referral'
                                            id='organizations_upon_referral'
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pr: '30px !important'
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} lg={4} md={12}>
                                        <Autocomplete
                                            multiple
                                            options={urineChanges}
                                            renderInput={(params) => <TextField {...params} label='GU/Urine Changes'/>}
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
                            </CardContent>
                        </SubCard>
                    </CardContent>
                </MainCard>
            </Grid>


            <Grid item xs={12} sm={12} lg={12} md={12}>
                <MainCard>
                    <CardContent>

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

                    </CardContent>
                </MainCard>
            </Grid>


            <Grid item xs={12} sm={12} lg={12} md={12}>

                <MainCard>
                    <CardContent>
                        <SubCard>
                            <CardContent>
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

                            </CardContent>
                        </SubCard>
                    </CardContent>
                </MainCard>
            </Grid>


        </Grid>
    );
};

export default ExistingCaseClientAssessment;
