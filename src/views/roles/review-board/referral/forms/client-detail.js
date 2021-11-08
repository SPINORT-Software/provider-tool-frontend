import React from 'react';


// material-ui
import {Button, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import {useFormik, withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {setClientDecision, setClientDetail} from "store/actions/reviewBoard/referralActions";


const ClientDetail = ({clientDetails, setClientDetail}) => {
    const formik = useFormik({
        initialValues: {
            client_referral_first_name: '',
            client_referral_last_name: '',
            client_referral_email: '',
        },
        onSubmit: (values) => {
            // eslint-disable-next-line camelcase
            setClientDetail(values)
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
                                        <TextField name='client_referral_first_name' id='client_referral_first_name'
                                                   fullWidth label='First Name'
                                                   value={formik.values.client_referral_first_name}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={8} lg={6} md={8}>
                                        <TextField name='client_referral_last_name' id='client_referral_last_name'
                                                   fullWidth label='Last Name'
                                                   value={formik.values.client_referral_last_name}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={12} lg={8} md={8}>
                                        <TextField name='client_referral_email' id='client_referral_email' fullWidth
                                                   label='Email'
                                                   value={formik.values.client_referral_email}
                                                   onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid item xs={6} sm={6} lg={6} md={4}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={12} lg={8} md={8}>
                                        <Button color='primary' variant='contained' fullWidth type='submit'>
                                            Save
                                        </Button>
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


function mapStateToProps(state) {
    return {
        clientDetails: state.reviewBoard.referralActivity.clientDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setClientDetail: (values) => dispatch(setClientDetail(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);

