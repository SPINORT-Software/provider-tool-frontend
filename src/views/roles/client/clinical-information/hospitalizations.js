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
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import SubCard from 'ui-component/cards/SubCard';



const Hospitalizations = ({setClinicalInformationDetails}) => {
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            hospitalizations_six_months: clinicalInfoData.hospitalizations_six_months,
            hospitalizations_twelve_months: clinicalInfoData.hospitalizations_twelve_months,
            hospitalization_last_date: clinicalInfoData.hospitalization_last_date,
            hospitalization_last_stay_length: clinicalInfoData.hospitalization_last_stay_length,
            hospitalization_last_medical_reason: clinicalInfoData.hospitalization_last_medical_reason,
        },
        validate: values => {
            dispatch(setClinicalInformationDetails(values))
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
                                                value={formik.values.hospitalizations_six_months}
                                                id='hospitalizations_six_months'
                                                name='hospitalizations_six_months'
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
                                                value={formik.values.hospitalizations_twelve_months}
                                                id='hospitalizations_twelve_months'
                                                name='hospitalizations_twelve_months'
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
                                                value={formik.values.hospitalization_last_date}
                                                id='hospitalization_last_date'
                                                name='hospitalization_last_date'
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
                                                value={formik.values.hospitalization_last_stay_length}
                                                id='hospitalization_last_stay_length'
                                                name='hospitalization_last_stay_length'
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
                                                value={formik.values.hospitalization_last_medical_reason}
                                                id='hospitalization_last_medical_reason'
                                                name='hospitalization_last_medical_reason'
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
