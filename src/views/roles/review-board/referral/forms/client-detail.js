import React from 'react';


// material-ui
import {Button, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import {useFormik, withFormik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from "react-redux";
import {setReferralDetails} from 'store/actions/reviewBoard/referralActions';


const ClientDetail = () => {
    const referralData = useSelector(state => state.reviewBoard.referrals.add.referralData)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            client_first_name: referralData.client_first_name,
            client_last_name: referralData.client_last_name,
            client_email: referralData.client_email,
        },
        validate: values => {
            const valuesData = {
                ...referralData,
                ...values
            }
            dispatch(setReferralDetails(valuesData));
        }
    });

    return (<Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Client Details'>
                <CardContent>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8} sm={10} lg={10} md={10}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sm={8} lg={6} md={8}>
                                        <TextField name='client_first_name' id='client_first_name'
                                                   fullWidth label='First Name'
                                                   value={formik.values.client_first_name}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={8} lg={6} md={8}>
                                        <TextField name='client_last_name' id='client_last_name'
                                                   fullWidth label='Last Name'
                                                   value={formik.values.client_last_name}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={12} lg={8} md={8}>
                                        <TextField name='client_email' id='client_email' fullWidth
                                                   label='Email'
                                                   value={formik.values.client_email}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>);
};

export default ClientDetail;

