import React from 'react';

// material-ui
import {
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    Card,
    Radio,
    RadioGroup,
    TextField,
    Button
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import {useFormik, withFormik} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/styles';
import {connect, useDispatch, useSelector} from 'react-redux';
import {setReferralDetails} from "store/actions/reviewBoard/referralActions";


const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    }
}));

const CaseManagementDecision = ({referralDetails, setClientDecision}) => {
    const classes = useStyles();
    const referralData = useSelector(state => state.reviewBoard.referrals.add.referralData)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            decision: referralData.decision,
            decision_detail: referralData.decision_detail
        },
        validate: (values) => {
            const valuesData = {
                ...referralData,
                ...values
            }
            dispatch(setReferralDetails(valuesData))
        }
    });

    return (
        <Card className={classes.card} title='Client Case Management Decision'>
            <CardContent>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={3} direction='column'>
                        <Grid item>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label='case-management-decision-radio'
                                    value={formik.values.decision}
                                    name='decision'
                                    id='decision'
                                    onChange={(event) => {
                                        formik.setFieldValue('decision', event.currentTarget.value)
                                    }}
                                >
                                    <FormControlLabel value='decision-accepted' control={<Radio/>}
                                                      label='Client is accepted in the Case Management Program'/>
                                    <FormControlLabel value='decision-refused' control={<Radio/>}
                                                      label='Client is refused for the Case Management Program'/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                maxRows={10}
                                id='decision_detail'
                                name='decision_detail'
                                label='Reason for Client Refusal'
                                placeholder='Enter reason here'
                                multiline
                                value={formik.values.decision_detail}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={6} lg={6}>
                            <Button color='primary' variant='contained' type='submit'>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default CaseManagementDecision;
