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
import commonApi from 'store/api-calls/common';
import ProgressCircularControlled from "../../../../ui/ProgressCircularControlled";
import {SNACKBAR_OPEN} from "store/actionTypes";

const ClientDetail = () => {
    const referralData = useSelector(state => state.reviewBoard.referrals.add.referralData)
    const dispatch = useDispatch()
    const [progressLoader, setProgressLoader] = React.useState(false);

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

    const checkIfClientEmailExists = async (e) => {
        setProgressLoader(true);
        const email = e.target.value

        if (email && email.length) {
            const clients = await commonApi.searchClientByEmail(email)

            if(clients.length > 0){
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Client already exists with that email address',
                    variant: 'alert',
                    alertSeverity: 'error', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                })
            }
        }
        setProgressLoader(false);
    }

    return (<Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Client Details' secondary={<ProgressCircularControlled display={progressLoader}/>}>
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
                                                   onBlur={checkIfClientEmailExists}
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

