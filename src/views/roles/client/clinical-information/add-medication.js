import React from 'react';

// material-ui
import {useTheme} from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, TextField,
    useMediaQuery,
    CardContent,
    CardActions
} from '@material-ui/core';
import {gridSpacing} from "store/constant";
import SubCard from "ui-component/cards/SubCard";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    medication_name: yup.string('Enter the name of the medication').required('Medication Name is required'),
    medication_start_date: yup.string('Enter the name of the medication').required('Medication start date is required'),
    medication_end_date: yup.string('Enter the name of the medication').required('Medication end date is required'),
    medication_dosage: yup.string('Enter the name of the medication').required('Medication dosage value is required'),
    medication_frequency: yup.string('Enter the name of the medication').required('Medication frequency is required'),
});

export default function AddMedicationDialog({open, handleClose, clinicalInfoData, setClinicalInformationDetails}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            medication_name: '',
            medication_start_date: '',
            medication_end_date: '',
            medication_dosage: '',
            medication_frequency: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(setClinicalInformationDetails({
                ...clinicalInfoData,
                current_medication: [
                    ...clinicalInfoData.current_medication,
                    {
                        ...values
                    }
                ]
            }))
            handleClose();
        }
    });

    return (
        <div>
            <Dialog fullScreen={fullScreen} open={open} aria-labelledby="add-medication-dialog">
                <DialogTitle id="responsive-dialog-title">Add New Medication</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <SubCard>
                            <CardContent>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={4} lg={12}>
                                        <TextField
                                            error={formik.touched.medication_name && Boolean(formik.errors.medication_name)}
                                            helperText={formik.touched.medication_name && formik.errors.medication_name}
                                            value={formik.values.medication_name}
                                            onChange={formik.handleChange}
                                            autoFocus
                                            fullWidth
                                            label="Medication Name"
                                            id='medication_name'
                                            name='medication_name'
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={12}>
                                        <TextField
                                            error={formik.touched.medication_start_date && Boolean(formik.errors.medication_start_date)}
                                            helperText={formik.touched.medication_start_date && formik.errors.medication_start_date}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            label="Start Date"
                                            id='medication_start_date'
                                            name='medication_start_date'
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={12}>
                                        <TextField
                                            error={formik.touched.medication_end_date && Boolean(formik.errors.medication_end_date)}
                                            helperText={formik.touched.medication_end_date && formik.errors.medication_end_date}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            label="End Date"
                                            id='medication_end_date'
                                            name='medication_end_date'
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={12}>
                                        <TextField
                                            error={formik.touched.medication_dosage && Boolean(formik.errors.medication_dosage)}
                                            helperText={formik.touched.medication_dosage && formik.errors.medication_dosage}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            label="Dosage"
                                            id='medication_dosage'
                                            name='medication_dosage'
                                        />
                                    </Grid>
                                    <Grid item xs={4} lg={12}>
                                        <TextField
                                            error={formik.touched.medication_frequency && Boolean(formik.errors.medication_frequency)}
                                            helperText={formik.touched.medication_frequency && formik.errors.medication_frequency}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            label="Frequency"
                                            id='medication_frequency'
                                            name='medication_frequency'
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button autoFocus onClick={handleClose} color="error">
                                    Close
                                </Button>
                                <Button variant="contained" size="small" type='submit'>
                                    Save
                                </Button>
                            </CardActions>
                        </SubCard>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
