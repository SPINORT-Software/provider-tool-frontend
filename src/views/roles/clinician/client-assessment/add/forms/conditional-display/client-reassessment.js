import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import ProviderSpecificForms from 'views/roles/common/provider-specific-forms';
import AssessmentForms from 'views/roles/common/assessment-forms';
import MaskedInput from 'react-text-mask';

import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    setReassessmentEMProviderSpecificFormUUID,
    setReassessmentEMGeneralAssessmentFormUUID,
    setReAssessmentDetails
} from "store/actions/clinician/clientAssessmentActions";

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

const ClientReasessment = () => {
    const clientAssessmentTypeData = useSelector(state => state.clinician.clientAssessment.add.assessment_type_data)
    const reAssessmentData = clientAssessmentTypeData.reassessment.data

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            date: reAssessmentData.date,
            reason: reAssessmentData.reason,
            total_time: reAssessmentData.total_time,
            mode_of_assessment: reAssessmentData.mode_of_assessment
        },
        validate: values => {
            dispatch(setReAssessmentDetails(values));
        }
    });

    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Date"
                    guide={false}

                    onChange={formik.handleChange}
                    name='date'
                    id="date"
                    value={formik.values.date}

                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue=""/>}
                />
            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Total time spent"
                    guide={false}

                    onChange={formik.handleChange}
                    name='total_time'
                    id="total_time"
                    value={formik.values.total_time}

                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue=""/>}
                />

            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <TextField type='text'
                           fullWidth
                           label='Reason'
                           defaultValue=''

                           onChange={formik.handleChange}
                           name='reason'
                           id="reason"
                           value={formik.values.reason}
                />
            </Grid>

            <Grid item xs={12} sm={8}>
                <TextField
                    select
                    label="Mode of Assessment"
                    fullWidth

                    onChange={formik.handleChange}
                    name='mode_of_assessment'
                    id="mode_of_assessment"
                    value={formik.values.mode_of_assessment}
                >
                    {modeOfAssessmentSelectList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <TextField id='client-reassessment-mode-of-assessment-other' type='text' fullWidth label='Other'
                           defaultValue=''/>
            </Grid>

            <Grid item xs={12} sm={8} lg={12}>
                <ProviderSpecificForms documentType='TYPE_CASE_MANAGER_ASSESSMENT'
                                       providerSpecificFormAction={setReassessmentEMProviderSpecificFormUUID}/>
            </Grid>

            <Grid item xs={12} sm={10} md={10} lg={12}>
                <AssessmentForms documentType='TYPE_CASE_MANAGER_ASSESSMENT'
                                 generalAssessmentFormAction={setReassessmentEMGeneralAssessmentFormUUID}/>
            </Grid>
        </Grid>
    );
};

export default ClientReasessment;
