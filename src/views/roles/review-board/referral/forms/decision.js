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
import {useDispatch, useSelector} from 'react-redux';
import {setReferralDetails} from "store/actions/reviewBoard/referralActions";
import reviewBoardApi from 'store/api-calls/review-board';
import JWTContext from "contexts/JWTContext";
import {SNACKBAR_OPEN} from "../../../../../store/actionTypes";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    }
}));

const CaseManagementDecision = ({setProgressLoader}) => {
    const classes = useStyles();

    const referralData = useSelector(state => state.reviewBoard.referrals.add.referralData)
    const referralForms = useSelector(state => state.reviewBoard.referrals.add.referralForms)
    const dispatch = useDispatch()
    const jwtContext = React.useContext(JWTContext);
    const {user} = jwtContext;


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
        },
    });

    const submitReferral = async event => {
        setProgressLoader(true)
        // eslint-disable-next-line camelcase
        const {user_type_pk} = user;
        const response = await reviewBoardApi.createReferral(referralData, referralForms, user_type_pk)

        if (response && 'result' in response) {
            if (response.result === true) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Successfully created client referral',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                })
            }
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Failed to create client referral. Please try again',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
            })
        }

        setProgressLoader(false)
    }

    const saveAndContinueReferral = event => {
        console.log(event)
    }

    return (
        <Card className={classes.card} title='Client Case Management Decision'>
            <CardContent>
                <form noValidate>
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
                                    <FormControlLabel value='ACTIVE_CLIENT' control={<Radio/>}
                                                      label='Client is accepted in the Case Management Program'/>
                                    <FormControlLabel value='DISCHARGED_CLIENT' control={<Radio/>}
                                                      label='Client is refused for the Case Management Program'/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id='decision_detail'
                                name='decision_detail'
                                label='Reason for Client Refusal'
                                placeholder='Enter reason here'
                                multiline
                                value={formik.values.decision_detail}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item>
                            <Grid container spacing={12}>
                                <Grid item>
                                    <Button color='primary' variant='contained' type='button' onClick={submitReferral}>
                                        Submit
                                    </Button>
                                </Grid>

                                <Grid item justifyContent='end'>
                                    <Button color='primary' variant='contained' type='button'
                                            onClick={saveAndContinueReferral}>
                                        Save & Continue Later
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default CaseManagementDecision;
