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



const AmbulanceUse = ({setClinicalInformationDetails}) => {
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
        enableReinitialize: true,
        initialValues: {
            ambulance_use_six_months: clinicalInfoData.ambulance_use_six_months,
            ambulance_use_medical_reason_six_months: clinicalInfoData.ambulance_use_medical_reason_six_months,
            ambulance_use_twelve_months: clinicalInfoData.ambulance_use_twelve_months,
            ambulance_use_medical_reason_twelve_months: clinicalInfoData.ambulance_use_medical_reason_twelve_months,
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
                            <SubCard title='Number of travels by ambulance during last 6 months:'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Ambulance use in last 6 months"
                                                value={formik.values.ambulance_use_six_months}
                                                id='ambulance_use_six_months'
                                                name='ambulance_use_six_months'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Medical reason for use of ambulance (last 6 months)'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Reason"
                                                value={formik.values.ambulance_use_medical_reason_six_months}
                                                id='ambulance_use_medical_reason_six_months'
                                                name='ambulance_use_medical_reason_six_months'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Number of travels by ambulance during last 12 months'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Ambulance use in last 12 months"
                                                value={formik.values.ambulance_use_twelve_months}
                                                id='ambulance_use_twelve_months'
                                                name='ambulance_use_twelve_months'
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={12} lg={6}>
                            <SubCard title='Medical reason for use of ambulance (last 12 months)'>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={4} lg={12}>
                                            <TextField
                                                fullWidth
                                                label="Reason"
                                                value={formik.values.ambulance_use_medical_reason_twelve_months}
                                                id='ambulance_use_medical_reason_twelve_months'
                                                name='ambulance_use_medical_reason_twelve_months'
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

export default AmbulanceUse;
