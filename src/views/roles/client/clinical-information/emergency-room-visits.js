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

const EmergencyRoomVisits = ({setClinicalInformationDetails}) => {
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            emergency_room_count_six_months: clinicalInfoData.emergency_room_count_six_months,
            emergency_room_count_twelve_months: clinicalInfoData.emergency_room_count_twelve_months,
            emergency_room_last_date: clinicalInfoData.emergency_room_last_date,
            emergency_room_last_medical_reason: clinicalInfoData.emergency_room_last_medical_reason,
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
                            <SubCard title='Number of emergency room visits (without hospital admission) during last 6 months'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="emergency room visits in last 6 months"
                                                value={formik.values.emergency_room_count_six_months}
                                                id='emergency_room_count_six_months'
                                                name='emergency_room_count_six_months'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Number of emergency room visits (without hospital admission) during last 12 months:'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="emergency room visits in last 12 months"
                                                value={formik.values.emergency_room_count_twelve_months}
                                                id='emergency_room_count_twelve_months'
                                                name='emergency_room_count_twelve_months'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Date of last emergency room visit'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                renderInput={(props) => <TextField fullWidth {...props} />}
                                                value={formik.values.emergency_room_last_date}
                                                name='emergency_room_last_date'
                                                id="emergency_room_last_date"
                                                onChange={(date) => {
                                                    dispatch(setClinicalInformationDetails({
                                                        emergency_room_last_date: date
                                                    }))
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Medical reason for last emergency room visit'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Reason"
                                                value={formik.values.emergency_room_last_medical_reason}
                                                id='emergency_room_last_medical_reason'
                                                name='emergency_room_last_medical_reason'
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

export default EmergencyRoomVisits;
