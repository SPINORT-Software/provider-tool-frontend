import React from 'react';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    CardContent,
    Button,
    Divider, FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem, Radio, RadioGroup, Slider,
    Switch,
    TextField,
    Typography, Autocomplete
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";
import JWTContext from "contexts/JWTContext";
import {useDispatch, useSelector} from "react-redux";

import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import SubCard from 'ui-component/cards/SubCard';



const Hospitalizations = () => {
    const theme = useTheme();
    const userAuthContext = React.useContext(JWTContext)
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch()
    const {
        user: {
            user_type_pk: clientUUID
        }
    } = userAuthContext;

    const formik = useFormik({
        initialValues: {},
        validate: values => {
            console.log(values)
        }
    });
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Number of hospitalizations during last 6 months'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Hospitalizations in last 6 months"
                                                value={formik.values.gender}
                                                id='gender'
                                                name='gender'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Number of hospitalizations during last 12 months'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Hospitalizations in last 12 months"
                                                value={formik.values.gender}
                                                id='gender'
                                                name='gender'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Date of last hospitalization'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Hospitalizations in last 12 months"
                                                value={formik.values.gender}
                                                id='gender'
                                                name='gender'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Length of stay of last hospitalization'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Hospitalizations in last 12 months"
                                                value={formik.values.gender}
                                                id='gender'
                                                name='gender'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Medical reason for last hospitalization'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Hospitalizations in last 12 months"
                                                value={formik.values.gender}
                                                id='gender'
                                                name='gender'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Hospitalizations;
