import React from 'react';

// material-ui
import {Grid, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import MaskedInput from 'react-text-mask';

import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    setExistingEMAssessmentDetails,
    setExistingEMProviderSpecificFormUUID,
    setExistingEMGeneralAssessmentFormUUID,
} from "store/actions/clinician/clientAssessmentActions";
import ProviderSpecificForms from "views/roles/common/provider-specific-forms";
import AssessmentForms from "views/roles/common/assessment-forms";

const ExistingExtraMural = () => {
    const clientAssessmentTypeData = useSelector(state => state.clinician.clientAssessment.add.assessment_type_data)
    const existingEMAssessmentData = clientAssessmentTypeData.existing_assessment.data

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            date: existingEMAssessmentData.date
        },
        validate: values => {
            dispatch(setExistingEMAssessmentDetails(values));
        }
    });

    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={12} lg={6} md={6}>
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

            <Grid item xs={12} sm={8} lg={12}>
                <ProviderSpecificForms documentType='TYPE_CLINICIAN_ASSESSMENT'
                                       providerSpecificFormAction={setExistingEMProviderSpecificFormUUID}/>
            </Grid>

            <Grid item xs={12} sm={10} md={10} lg={12}>
                <AssessmentForms documentType='TYPE_CLINICIAN_ASSESSMENT'
                                 generalAssessmentFormAction={setExistingEMGeneralAssessmentFormUUID}/>
            </Grid>

        </Grid>
    );
};

export default ExistingExtraMural;