import React, {useEffect, useState} from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

// redux
import {useDispatch, useSelector} from "react-redux";
import {setDailyWorkLoadDetails} from "store/actions/caseManager/dailyWorkloadActions";
import {useFormik} from "formik";

const ClientCaseload = ({retrieveMode}) => {
    const dailyWorkloadData = useSelector(state => state.caseManager.dailyWorkload.add)
    const dispatch = useDispatch()
    const [isRetrieveMode, setIsRetrieveMode] = useState(false);

    useEffect(() => {
        // Switch to retrieve mode if set in the props
        if (retrieveMode) {
            setIsRetrieveMode(true)
        }
    }, [retrieveMode])

    const formik = useFormik({
        initialValues: {
            client_caseload_casemanagement_number_clients: dailyWorkloadData.client_caseload_casemanagement_number_clients,
            client_caseload_casemanagement_total_time: dailyWorkloadData.client_caseload_casemanagement_total_time,
            client_caseload_regular_number_clients: dailyWorkloadData.client_caseload_regular_number_clients,
            client_caseload_regular_total_time: dailyWorkloadData.client_caseload_regular_total_time
        },
        validate: values => {
            const valuesData = {
                ...values
            }
            if (!retrieveMode) {
                dispatch(setDailyWorkLoadDetails(valuesData));
            }
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={8}>
                <SubCard title='Case Management Clients'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={8}>
                                <TextField type='number'
                                           fullWidth
                                           label='Number of Case Management Clients'
                                           defaultValue={formik.values.client_caseload_casemanagement_number_clients}
                                           onChange={formik.handleChange}
                                           name='client_caseload_casemanagement_number_clients'
                                           id="client_caseload_casemanagement_number_clients"
                                           disabled={isRetrieveMode}
                                           value={formik.values.client_caseload_casemanagement_number_clients}
                                />
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Total time spent"
                                    guide={false}
                                    defaultValue={formik.values.client_caseload_casemanagement_total_time}
                                    onChange={formik.handleChange}
                                    name='client_caseload_casemanagement_total_time'
                                    id="client_caseload_casemanagement_total_time"
                                    disabled={isRetrieveMode}
                                    value={formik.values.client_caseload_casemanagement_total_time}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={8}>
                <SubCard title='Regular Clients'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={8}>
                                <TextField type='number'
                                           fullWidth
                                           label='Number of Regular Clients'
                                           defaultValue={formik.values.client_caseload_regular_number_clients}
                                           onChange={formik.handleChange}
                                           name='client_caseload_regular_number_clients'
                                           id="client_caseload_regular_number_clients"
                                           disabled={isRetrieveMode}
                                           value={formik.values.client_caseload_regular_number_clients}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Total time spent"
                                    guide={false}
                                    defaultValue={formik.values.client_caseload_regular_total_time}
                                    onChange={formik.handleChange}
                                    name='client_caseload_regular_total_time'
                                    id="client_caseload_regular_total_time"
                                    value={formik.values.client_caseload_regular_total_time}
                                    disabled={isRetrieveMode}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ClientCaseload;
