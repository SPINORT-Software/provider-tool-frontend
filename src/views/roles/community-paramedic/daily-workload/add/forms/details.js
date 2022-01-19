import React, {useEffect, useState, useRef} from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import caseManagerApi from 'store/api-calls/case-manager';
import {setDailyWorkLoadDetails, setAddDailyWorkLoadDate} from "store/actions/caseManager/dailyWorkloadActions";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";

const Details = ({editMode}) => {
    const dispatch = useDispatch()
    const [isEditMode, setIsEditMode] = useState(false);
    const dailyWorkloadData = useSelector(state => state.caseManager.dailyWorkload.add)
    const [valueBasic, setValueBasic] = React.useState(new Date());

    useEffect(() => {
        if (editMode) {
            setIsEditMode(true);
        }
    }, [editMode])

    const handleWorkloadDateChange = (date) => {
        dispatch(setAddDailyWorkLoadDate(date))
    }

    const formik = useFormik({
        initialValues: {
            daily_workload_date: dailyWorkloadData.daily_workload_date,
            service_recipient_travel: dailyWorkloadData.service_recipient_travel,
            functional_center: dailyWorkloadData.functional_center
        },
        enableReinitialize: true,
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        renderInput={(props) => <TextField fullWidth {...props} />}
                        label="Date & Time"
                        value={formik.values.daily_workload_date}
                        onChange={handleWorkloadDateChange}
                        name='daily_workload_date'
                        id="daily_workload_date"
                        format="YYYY-MM-DD"
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
};

export default Details;
