import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import JWTContext from 'contexts/JWTContext';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    Autocomplete,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid, TextField,
} from '@material-ui/core';

import {useSelector, useDispatch} from "react-redux";

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import {SNACKBAR_OPEN} from 'store/actionTypes';

import {useFormik} from "formik";

import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';
import setVisitorLogDetail from "store/actions/client/visitorLogActions";
import MaskedInput from 'react-text-mask';
import clientApi from 'store/api-calls/client'

// style constant
const useStyles = makeStyles((theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none'
        },
        '& button': {
            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start'
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px'
        },
        '& button > div > span': {
            display: 'block'
        },
        '& > div > span': {
            display: 'none'
        }
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%'
    }
}));

// tabs
function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};


const organizationList = [
    {label: 'Ability NB', id: 'ability-nb'},
    {label: 'Ambulance New Brunswick (ANB)', id: 'ambulance-new-brunswick-(ANB)'},
    {label: 'Community Health Centers', id: 'community-health-centers'},
    {label: 'Department of Veteran Affairs', id: 'department-of-veteran-affairs'},
    {label: 'Extra-Mural Program - Lead Nurse Case Manager', id: 'extra-mural-program-lead-nurse-case-manager'},
    {label: 'Extra-Mural Program - Nutritionist', id: 'extra-mural-program-lead-nurse-nutritionist'},
    {
        label: 'Extra-Mural Program - Occupational Therapist',
        id: 'extra-mural-program-lead-nurse-occupational-therapist'
    },
    {label: 'Extra-Mural Program - Physical Therapist', id: 'extra-mural-program-lead-nurse-physical-therapist'},
    {label: 'Extra-Mural Program - Registered Nurse', id: 'extra-mural-program-lead-nurse-registered-nurse'},
    {label: 'Extra-Mural Program - Respiratory Therapist', id: 'extra-mural-program-lead-nurse-respiratory-therapist'},
    {label: 'Extra-Mural Program - Social Worker', id: 'extra-mural-program-lead-nurse-social-worker'},
    {
        label: 'Extra-Mural Program - Speech & Language Therapist',
        id: 'extra-mural-program-lead-nurse-speech-language-therapist'
    },
    {label: 'Extra-Mural Program - Other', id: 'extra-mural-program-lead-nurse-other'},
    {
        label: 'Family Physician (Outside Community Health Centers)',
        id: 'family-physician-outside-community-health-centers'
    },
    {label: 'First Nations', id: 'First Nations'},
    {label: 'Homecare Agency', id: 'Homecare Agency'},
    {label: 'Public Health Services', id: 'Public Health Services'},
    {
        label: 'Social Development - Home Adaptations for Seniors Independence Program',
        id: 'social-development-home-adaptations-for-seniors-independence-program'
    },
    {label: 'Social Development - Homeowner Repair Program', id: 'social-development-homeowner-repair-program'},
    {label: 'Social Development - Housing Program', id: 'social-development-housing-program'},
    {label: 'Social Development - Long-Term Care Program', id: 'social-development-long-term-care-program'},
    {
        label: 'Social Development - Mobility and Adaptive Equipment Loan Program',
        id: 'social-development-mobility-adaptive-equipment-loan-program'
    },
    {label: 'Social Development - Social Assistance Program', id: 'social-development-social-assistance-program'},
    {label: 'Social Development - Other', id: 'social-development-other'},
    {label: 'Volunteer Organizations', id: 'volunteer-organizations'},
    {label: 'Other', id: 'other'},
];


const VisitorsLog = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);

    const dispatch = useDispatch()
    const visitorLogData = useSelector(store => store.client.visitorLogs.add)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userAuthContext = React.useContext(JWTContext)
    const {
        user: {
            user_type_pk: clientUUID
        }
    } = userAuthContext;

    const formik = useFormik({
        initialValues: {
            date: visitorLogData.date,
            organization: visitorLogData.organization,
            visit_reason: visitorLogData.visit_reason,
            client: clientUUID
        },
        validate: values => {
            dispatch(setVisitorLogDetail(values))
        }
    });

    const submitVisitorLog = async (e) => {
        setProgressLoader(true);
        visitorLogData.organization = visitorLogData.organization.id
        const response = await clientApi.createVisitorLog(visitorLogData);

        if (response && 'status' in response) {
            if (response.status === true) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Visitor Log successfully created',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                })
            }
        }
        setProgressLoader(false);
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title='Visitor Log ' secondary={<ProgressCircularControlled display={progressLoader}/>}
                          content={false}>

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={8}>

                            <CardContent className={classes.cardPanels}>
                                <Grid container spacing={gridSpacing}>

                                    <Grid item xs={4} sm={4}>
                                        <MaskedInput
                                            mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                            className="form-control"
                                            label="Date of Visit"
                                            guide={false}
                                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                               defaultValue=""/>}

                                            defaultValue={formik.values.date}
                                            onChange={formik.handleChange}
                                            name='date'
                                            id='date'
                                            value={formik.values.date}
                                        />

                                    </Grid>

                                    <Grid item xs={8} sm={8}>
                                        <Autocomplete
                                            disablePortal
                                            options={organizationList}
                                            name='organization'
                                            value={formik.values.organization}
                                            id='organization'
                                            onChange={(e, value) => {
                                                formik.setFieldValue('organization', value)
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Organization"/>}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} lg={12} md={12}>
                                        <TextField
                                            fullWidth
                                            maxRows={20}
                                            multiline
                                            name='visit_reason'
                                            id='visit_reason'
                                            label='Visit Reason'
                                            value={formik.values.visit_reason}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>

                                </Grid>

                            </CardContent>

                        </Grid>
                    </Grid>

                    <Divider/>

                    <CardActions>
                        <Grid container justifyContent='space-between' spacing={0}>
                            <Grid item alignContent='end'>
                                <AnimateButton>
                                    <Button color='secondary' variant='contained' size='large'
                                            onClick={submitVisitorLog}>
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </CardActions>

                </MainCard>
            </Grid>
        </Grid>
    );
};

export default VisitorsLog;
