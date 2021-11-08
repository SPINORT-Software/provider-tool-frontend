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
import * as referralActions from 'store/actions/reviewBoard/referralActions'
import {connect} from 'react-redux';
import {setClientDecision} from "store/actions/reviewBoard/referralActions";


const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    }
}));

const CaseManagementDecision = ({referralDetails, setClientDecision}) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            client_referral_decision_radio: '',
            client_referral_decision_reason: '',
        },
        onSubmit: (values) => {
            // eslint-disable-next-line camelcase
            setClientDecision(
                values.client_referral_decision_radio,
                values.client_referral_decision_reason
            )
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
                                    value={formik.values.client_referral_decision_radio}
                                    name='client_referral_decision_radio'
                                    id='client_referral_decision_radio'
                                    onChange={(event) => {
                                        formik.setFieldValue('client_referral_decision_radio', event.currentTarget.value)
                                    }}
                                >
                                    <FormControlLabel value='decision-accepted' control={<Radio/>}
                                                      label='Client is accepted in the Case Management Program'/>
                                    <FormControlLabel value='decision-refused' control={<Radio/>}
                                                      label='Client is refused for the Case Management Program'/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                maxRows={10}
                                id='client_referral_decision_reason'
                                name='client_referral_decision_reason'
                                label='Reason for Client Refusal'
                                placeholder='Enter reason here'
                                multiline
                                value={formik.values.client_referral_decision_reason}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={6} lg={6}>
                            <Button color='primary' variant='contained' fullWidth type='submit'>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

function mapStateToProps(state) {
    return {
        referralDetails: state.reviewBoard.referralActivity.referralDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setClientDecision: (decisionValue, decisionReason) => dispatch(referralActions.setClientDecision(decisionValue, decisionReason))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseManagementDecision);
