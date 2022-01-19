import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import ProviderSpecificForms from 'views/roles/common/provider-specific-forms';
import AssessmentFormsCP from 'views/roles/common/assessment-forms-cp';
import MaskedInput from 'react-text-mask';

import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// Redux
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    setNewEMAssessmentDetails,
    setNewEMProviderSpecificFormUUID,
    setNewEMGeneralAssessmentFormUUID
} from "store/actions/caseManager/clientAssessmentActions";

const modeOfAssessmentSelectList = [
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

const NewCaseClient = () => {

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
            <Grid item xs={12} sm={12} lg={4} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        renderInput={(props) => <TextField fullWidth {...props} />}
                        label="Date"
                        value={formik.values.daily_workload_date}
                        name='daily_workload_date'
                        id="daily_workload_date"
                        format="YYYY-MM-DD"
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} lg={4} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Arrival time at Client's home"
                    guide={false}

                    onChange={formik.handleChange}
                    name='total_time'
                    id="total_time"
                    value={formik.values.total_time}

                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue=""/>}
                />
            </Grid>


            <Grid item xs={12} sm={12} lg={4} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Departure time from Client's home"
                    guide={false}

                    onChange={formik.handleChange}
                    name='total_time'
                    id="total_time"
                    value={formik.values.total_time}

                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue=""/>}
                />
            </Grid>


            <Grid item xs={12} lg={12} sm={12}>
                <AssessmentFormsCP documentType='TYPE_CASE_MANAGER_ASSESSMENT'
                                 generalAssessmentFormAction={setNewEMGeneralAssessmentFormUUID}/>
            </Grid>

        </Grid>
    );
};

export default NewCaseClient;
