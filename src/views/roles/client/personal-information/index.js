import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Box, Grid, Tab, Tabs, CardActions, CardContent, Button} from '@material-ui/core';

// project imports
import PersonalInformation from './personal-info';
import HomeSafetyAssessment from './home-safety';
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import clientApi from "store/api-calls/client";
import {setRetrievedClientPersonalInformationData} from "store/actions/client/personalInformationActions";
import JWTContext from "contexts/JWTContext";
import {useDispatch, useSelector} from "react-redux";
import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';
import {SNACKBAR_OPEN} from "store/actionTypes";


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
        label: 'Personal Details',
        icon: <AccountCircleTwoToneIcon sx={{fontSize: '1.3rem'}}/>
    },
    {
        label: 'Home Safety Assessment',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.3rem'}}/>
    }
];

// ===========================|| PROFILE 1 ||=========================== //

const PersonalInformationIndex = () => {
    const classes = useStyles();
    const personalInfoData = useSelector(state => state.client.personalInformation)
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [progressLoader, setProgressLoader] = React.useState(false);

    const {
        user: {
            user_type_pk: clientUUID
        }
    } = React.useContext(JWTContext);

    const fetchPersonalInformation = async () => {
        setProgressLoader(true);  // Call this to show the loader for the current tab
        const response = await clientApi.retrievePersonalInformation(clientUUID)
        if ('status' in response && response.status === 200) {
            dispatch(setRetrievedClientPersonalInformationData(response.data))
        } else  if ('status' in response && response.status > 404){
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Could not retrieve your personal information. Please reload the page and try again',
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
        fetchPersonalInformation()
    }, []);


    const handlePersonalInfoSave = async (e) => {
        setProgressLoader(true)
        personalInfoData.client = clientUUID
        const response = await clientApi.createOrUpdatePersonalInformation(personalInfoData)

        if (response.status === 200) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Your personal information has been updated!',
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
                message: 'There was an error while saving your personal information.',
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
        <MainCard title='Personal Information' secondary={<ProgressCircularControlled display={progressLoader}/>}>
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
                            <PersonalInformation setProgressLoader={setProgressLoader} client={clientUUID}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <HomeSafetyAssessment client={clientUUID}/>
                        </TabPanel>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent='space-between' spacing={0}>
                    <Grid item alignContent='end'>
                        <Button color='secondary' variant='contained' size='large'
                                onClick={handlePersonalInfoSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </MainCard>
    );
};

export default PersonalInformationIndex;
