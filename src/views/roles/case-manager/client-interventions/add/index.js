import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@material-ui/core';

// project imports
import ClientSelect from './forms/client';
import InterventionDetails from './forms/intervention-details';
import InterventionAssessmentForms from './forms/assessment-forms';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import JWTContext from "contexts/JWTContext";
import {
    setInterventionCaseManagerDetail,
    setInterventionClientDetail
} from "store/actions/caseManager/clientInterventionActions";
import caseManagerApi from "store/api-calls/case-manager";
import {SNACKBAR_OPEN} from "store/actionTypes";
import ProgressCircularControlled from "../../../../ui/ProgressCircularControlled";

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
    const { children, value, index, ...other } = props;

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
        label: 'Client Select',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Select a client for intervention'
    },
    {
        label: 'Intervention Details',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Fill in the intervention details'
    },
    {
        label: 'Assessment Forms',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Add Assessment files'
    }
];


const ClientIntervention = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const [progressLoader, setProgressLoader] = React.useState(false);

    const clientInterventionData = useSelector(state => state.caseManager.clientIntervention.add)
    const clientInterventionAddData = clientInterventionData.intervention

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {
        user: {
            user_type_pk: caseManagerUUID
        }
    } = React.useContext(JWTContext);

    useEffect(() => {
        dispatch(setInterventionCaseManagerDetail(caseManagerUUID))
    }, []);

    const handleSubmit = async (event) => {
        setProgressLoader(true);  // Call this to show the loader for the current tab

        // Make a new helper method to validate if all the required fields are non empty

        // temporary fix to put case manager id in the data

        const response = await caseManagerApi.createClientIntervention(clientInterventionData);

        if (response && 'result' in response) {
            if (response.result === true) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Client Intervention has been successfully added.',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Client Intervention could not be added. Please try again',
                    variant: 'alert',
                    alertSeverity: 'error', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
            }
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Client Intervention could not be added. Please try again',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }

        setProgressLoader(false);
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title='Client Intervention' content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={3}>
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
                                                    <Typography sx={{ textTransform: 'capitalize' }} variant='subtitle1'
                                                                color='inherit'>
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography component='div' variant='caption'
                                                                sx={{ textTransform: 'capitalize' }}>
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
                                    <ClientSelect setSelectedClientValueToStore={setInterventionClientDetail} storeData={clientInterventionAddData}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <InterventionDetails providerProfessionType="PROVIDER_TYPE_REGISTERED_NURSE"/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <InterventionAssessmentForms providerProfessionType="PROVIDER_TYPE_REGISTERED_NURSE"/>
                                </TabPanel>
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Divider />

                    <CardActions>
                        <Grid container justifyContent='space-between' spacing={0}>
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
                            <Grid item>
                                {value < 2 && (
                                    <AnimateButton>
                                        <Button variant='contained' size='large'
                                                onClick={(e) => handleChange(e, 1 + parseInt(value, 10))}>
                                            Continue
                                        </Button>
                                    </AnimateButton>
                                )}
                                {value === 2 && (
                                    <Grid container justify="space-around" spacing={gridSpacing}>
                                        <Grid item>
                                            <ProgressCircularControlled display={progressLoader}/>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant='contained' size='large'
                                                        onClick={handleSubmit}>
                                                    Save
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ClientIntervention;
