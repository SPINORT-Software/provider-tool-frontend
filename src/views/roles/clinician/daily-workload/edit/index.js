import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import JWTContext from 'contexts/JWTContext';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    Button,
    CardActions,
    CircularProgress,
    CardContent,
    Divider,
    Grid,
    Tab,
    Tabs,
    Typography, IconButton
} from '@material-ui/core';

// project imports
import ClientCaseLoad from '../add/forms/client-caseload';
import Details from '../add/forms/details';

import {useSelector, useDispatch} from "react-redux";

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import {SNACKBAR_OPEN} from 'store/actionTypes';

import clinicianApi from 'store/api-calls/clinician';

import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';
import {
    setDailyWorkLoadDetails,
    resetDailyWorkLoad,
    retrieveDailyWorkload,
    setRetrievedDailyWorkLoadDetailsUpdate
} from "store/actions/clinician/dailyWorkloadActions";
import {useNavigate, useParams} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import InfoTwoTone from "@material-ui/icons/InfoTwoTone";


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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Details',
        icon: <DescriptionTwoToneIcon/>,
        caption: 'Workload Information'
    },
    {
        label: 'Client Caseload',
        icon: <DescriptionTwoToneIcon/>,
        caption: 'Caseload Information'
    },
];

// ===========================|| PROFILE 2 ||=========================== //

const DailyWorkloadEdit = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);

    const userAuthContext = React.useContext(JWTContext)
    const {
        user: {
            user_type_pk: clinicianUUID
        }
    } = userAuthContext;

    const {workload_id} = useParams();
    const dailyWorkloadDataEdit = useSelector(state => state.clinician.dailyWorkload.add)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigateWorkloadDetail = () => {
        navigate(`/workload/${workload_id}`)
    }

    useEffect(async () => {
        setProgressLoader(true);
        const response = await clinicianApi.retrieveDailyWorkload(workload_id);

        if ('result' in response && response.result === true && 'data' in response) {
            dispatch(setRetrievedDailyWorkLoadDetailsUpdate(response.data))
        }
        setProgressLoader(false);
    }, []);

    const handleWorkloadUpdate = async (e) => {
        setProgressLoader(true);  // Call this to show the loader for the current tab
        dispatch(setDailyWorkLoadDetails({
            clinician: clinicianUUID
        }))
        const response = await clinicianApi.updateDailyWorkload(workload_id, dailyWorkloadDataEdit);
        setProgressLoader(false);

        if ('result' in response === true) {
            if (response.result === true) {
                navigate(`/workload/${workload_id}`)

                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Your Daily Workload entry has been updated.',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
                dispatch(resetDailyWorkLoad())
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Your Daily workload could not be updated. Please try again',
                    variant: 'alert',
                    alertSeverity: 'error', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
            }
        }

        if ('errors' in response === true) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Please provide all the fields with valid values and try submit again.',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }

        if ('status' in response === true && response.status > 200) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Please provide all the fields with valid values and try submit again.',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title={
                    <>
                        <>Edit Daily Workload</>
                        <ProgressCircularControlled display={progressLoader}/>
                    </>
                } secondary={
                    <>
                        <Tooltip title="View Workload Detail" onClick={navigateWorkloadDetail}>
                            <IconButton color="secondary">
                                <InfoTwoTone sx={{fontSize: '1.5rem'}}/>
                            </IconButton>
                        </Tooltip>
                    </>
                }
                          content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation='vertical'
                                    className={classes.profileTab}
                                    variant='scrollable'
                                    sx={{
                                        '& button': {
                                            borderRadius: `${customization.borderRadius}px`
                                        }
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid container direction='column'>
                                                    <Typography sx={{textTransform: 'capitalize'}} variant='subtitle1'
                                                                color='inherit'>
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography component='div' variant='caption'
                                                                sx={{textTransform: 'capitalize'}}>
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent className={classes.cardPanels}>
                                <TabPanel value={value} index={0}>
                                    <Details editMode/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <ClientCaseLoad editMode/>
                                </TabPanel>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <CardActions>
                        <Grid container justifyContent='space-between' spacing={0}>
                            <Grid item>
                                <Grid container justifyContent='space-between' spacing={1}>
                                    <Grid item>
                                        {value < 1 && (
                                            <AnimateButton>
                                                <Button variant='contained' size='large'
                                                        onClick={(e) => handleChange(e, 1 + parseInt(value, 10))}>
                                                    Continue
                                                </Button>
                                            </AnimateButton>
                                        )}
                                    </Grid>

                                    <Grid item>
                                        {value > 0 && (
                                            <AnimateButton>
                                                <Button variant='outlined' size='large'
                                                        onClick={(e) => handleChange(e, parseInt(value, 10) - 1)}>
                                                    Back
                                                </Button>
                                            </AnimateButton>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item alignContent='end'>
                                {value === 1 && (
                                    <AnimateButton>
                                        <Button color='secondary' variant='contained' size='large'
                                                onClick={handleWorkloadUpdate}>
                                            Update <ProgressCircularControlled display={progressLoader}/>
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>

                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DailyWorkloadEdit;
