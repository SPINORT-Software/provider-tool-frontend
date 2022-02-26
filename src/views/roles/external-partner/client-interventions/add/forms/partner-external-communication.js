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


const PartnerExternalCommunication = () => {
    const clientInterventionAddData = useSelector(state => state.externalPartner.clientIntervention.add)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            external_comm_external_referral_organization: clientInterventionAddData.external_comm_external_referral_organization,
            external_comm_external_referral_user: clientInterventionAddData.external_comm_external_referral_user,
            external_comm_external_followup_organization: clientInterventionAddData.external_comm_external_followup_organization,
            external_comm_external_followup_user: clientInterventionAddData.external_comm_external_followup_user,
        },
        validate: values => {
            dispatch(setInterventionFormDetails(values))
        }
    });

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


                </Grid>
            </Grid>
        </Grid>
    );
};

export default PartnerExternalCommunication;
