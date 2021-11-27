import React from 'react';

// material-ui
import {
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Radio,
    RadioGroup
} from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {setAssessmentClientStatus} from "../../../../../store/actions/caseManager/clientAssessmentActions";

const ClientSelect = () => {
    const [valueLabel, setValueLabel] = React.useState('checked');
    const dispatch = useDispatch()

    const clientAssessmentStore = useSelector(state => state.caseManager.clientAssessment)
    const clientAssessmentTypeStatus = clientAssessmentStore.add.assessment.client_status

    const formik = useFormik({
        initialValues: {
            client_status: clientAssessmentTypeStatus
        },
        validate: values => {
            // eslint-disable-next-line camelcase
            const {client_status} = values;
            dispatch(setAssessmentClientStatus(client_status));
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} lg={8} md={8}>
                <TextField type='text' fullWidth label='Client' defaultValue='' />
            </Grid>

            <Grid item xs={12} md={8}>
                <SubCard title='New Case Management Client (Active)'>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={12} lg={8} md={8}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label='client-status'
                                    // value={valueLabel}
                                    // onChange={(e) => setValueLabel(e.target.value)}
                                    name='client_status'
                                    id="client_status"
                                    onChange={formik.handleChange}
                                    value={formik.values.client_status}
                                >
                                    <FormControlLabel value='NEW_CASE_CLIENT_EXISTING_EMC_NO_REASSESS' control={<Radio />}
                                                      label='Existing Extra-Mural Client – No need to re-assess ' />
                                    <FormControlLabel value='NEW_CASE_CLIENT_EXISTING_EMC_REASSESS' control={<Radio />}
                                                      label='Existing Extra-Mural Client - Need to re-assess' />
                                    <FormControlLabel value='NEW_CASE_CLIENT_NEW_EXTRA_MURAL_CLIENT' control={<Radio />}
                                                      label='New Extra-Mural Client' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} md={8}>
                <SubCard title='Existing Case Management Client'>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={12} lg={8} md={8}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label='client-status'
                                    // value={valueLabel}
                                    // onChange={(e) => setValueLabel(e.target.value)}
                                    id="client_status"
                                    onChange={formik.handleChange}
                                    value={formik.values.client_status}
                                    name='client_status'
                                >
                                    <FormControlLabel value='EXISTING_CASE_CLIENT_REASSESS' control={<Radio />}
                                                      label='Need to re-assess' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ClientSelect;
