import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Box, Grid, Tab, Tabs, CardActions, CardContent, Button} from '@material-ui/core';

// project imports
import Hopsitalizations from './hospitalizations';
import Medication from './medication';
import AmbulanceUse from './ambulance-use';
import EmergencyRoomVisits from './emergency-room-visits';
import ClinicalInformation from './clinical-information';

import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import {useSelector, useDispatch} from "react-redux";
import JWTContext from "contexts/JWTContext";

import {
    setClinicalInformationDetails,
    setRetrievedClientClinicalInformationData
} from "store/actions/client/clinicalInformationActions";
import {SNACKBAR_OPEN} from "store/actionTypes";
import clientApi from "store/api-calls/client";
import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';

const useStyles = makeStyles((theme) => ({
    accountTab: {
        marginBottom: '24px',
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main
        },
        '& a > svg': {
            marginBottom: '0px !important',
            marginRight: '10px'
        }
    }
}));

// tabs panel
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    {children}
                </Box>
            )}
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
        label: 'Clinical Information',
        icon: <AccountCircleTwoToneIcon sx={{fontSize: '1.2rem'}}/>
    },
    {
        label: 'Hospitalizations',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.2rem'}}/>
    },
    {
        label: 'Emergency Room Visits',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.2rem'}}/>
    },
    {
        label: 'Ambulance Use',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.2rem'}}/>
    },
    {
        label: 'Medication',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.2rem'}}/>
    }
];

// ===========================|| PROFILE 1 ||=========================== //

const ClinicalInformationIndex = () => {
    const classes = useStyles();
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch();

    const [progressLoader, setProgressLoader] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userAuthContext = React.useContext(JWTContext)
    const {
        user: {
            user_type_pk: clientUUID
        }
    } = userAuthContext;

    const fetchClinicalInformation = async () => {
        setProgressLoader(true);  // Call this to show the loader for the current tab
        const response = await clientApi.retrieveClinicalInformation(clientUUID)
        if ('status' in response && response.status === 200) {
            dispatch(setRetrievedClientClinicalInformationData(response.data))
        } else if ('status' in response && response.status > 404) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Could not retrieve your clinical information. Please reload the page and try again',
                variant: 'alert',
                alertSeverity: 'warning', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }
        setProgressLoader(false);
    }

    useEffect(() => {
            dispatch(setClinicalInformationDetails({
                client: clientUUID
            }));

            fetchClinicalInformation()
        }, []
    )

    const handleClinicalInfoSave = async (e) => {
        setProgressLoader(true)
        clinicalInfoData.client = clientUUID
        const response = await clientApi.createOrUpdateClinicalInformation(clinicalInfoData)

        if (response.status === 200) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Your clinical information has been updated!',
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
                message: 'There was an error while saving your clinical information.',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }
        setProgressLoader(false)
    }

    return (
        <MainCard title='Clinical Information' secondary={<ProgressCircularControlled display={progressLoader}/>}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            className={classes.accountTab}
                            variant="scrollable"
                        >
                            {tabsOption.map((tab, index) => (
                                <Tab key={index} component={Link} to="#" icon={tab.icon}
                                     label={tab.label} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <ClinicalInformation setClinicalInformationDetails={setClinicalInformationDetails}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Hopsitalizations setClinicalInformationDetails={setClinicalInformationDetails}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <EmergencyRoomVisits setClinicalInformationDetails={setClinicalInformationDetails}/>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <AmbulanceUse setClinicalInformationDetails={setClinicalInformationDetails}/>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Medication setClinicalInformationDetails={setClinicalInformationDetails}/>
                        </TabPanel>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent='space-between' spacing={0}>
                    <Grid item alignContent='end'>
                        <Button color='secondary' variant='contained' size='large'
                                onClick={handleClinicalInfoSave}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </MainCard>
    );
};

export default ClinicalInformationIndex;
