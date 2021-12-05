import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import caseManagerApi from 'store/api-calls/case-manager';
import {setDailyWorkLoadDetails} from "store/actions/caseManager/dailyWorkloadActions";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";

const Details = () => {
    const dailyWorkloadData = useSelector(state => state.caseManager.dailyWorkload.add)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            daily_workload_date: dailyWorkloadData.daily_workload_date,
            service_recipient_travel: dailyWorkloadData.service_recipient_travel,
            functional_center: dailyWorkloadData.functional_center,
        },
        validate: values => {
            const valuesData = {
                ...values
            }
            dispatch(setDailyWorkLoadDetails(valuesData));
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
                    placeholder="YYYY-MM-DD"
                    onChange={formik.handleChange}
                    name='daily_workload_date'
                    id="daily_workload_date"
                    value={formik.values.daily_workload_date}
                    render={(ref, props) => <TextField
                        fullWidth inputRef={ref} {...props}
                        defaultValue=""
                    />}
                />
            </Grid>

            <Grid item xs={8} sm={8} lg={8} md={8}>
                <SubCard title='Time Spent'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Service Recipient Travel"
                                    guide={false}
                                    id="service_recipient_travel"
                                    onChange={formik.handleChange}
                                    name='service_recipient_travel'
                                    value={formik.values.service_recipient_travel}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                       defaultValue=""/>}
                                />

                            </Grid>
                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Functional Center"
                                    guide={false}
                                    id="functional_center"
                                    onChange={formik.handleChange}
                                    name='functional_center'
                                    value={formik.values.functional_center}
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

export default Details;
