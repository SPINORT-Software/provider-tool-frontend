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
    Typography
} from '@material-ui/core';

// project imports
import ClientCaseLoad from './forms/client-caseload';
import ProjectClinicalActivities from './forms/project-clinical-activities';
import ProjectActivities from './forms/project-activities';
import Details from './forms/details';

import {useSelector, useDispatch} from "react-redux";

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@material-ui/icons/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import {SNACKBAR_OPEN} from 'store/actionTypes';

import caseManagerApi from 'store/api-calls/case-manager';
import {listReferralsByReviewBoardID} from "store/actions/reviewBoard/referralActions";

import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';

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
        caption: 'Caption here'
    },
    {
        label: 'Client Caseload',
        icon: <DescriptionTwoToneIcon/>,
        caption: 'Billing Information'
    },
    {
        label: 'Project Related Clinical Activities',
        icon: <CreditCardTwoToneIcon/>,
        caption: 'Add & Update Card'
    },
    {
        label: 'Research Related Activities',
        icon: <VpnKeyTwoToneIcon/>,
        caption: 'Update Profile Security'
    }
];

// ===========================|| PROFILE 2 ||=========================== //

const DailyWorkload = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const createDailyWorkload = async () => (caseManagerApi.createDailyWorkload())

    useEffect(() => {
        setProgressLoader(true);  // Call this to show the loader for the current tab

        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: 'This is default message',
            variant: 'alert',
            alertSeverity: 'success', // error , success, warning
            anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
            transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
            close: false
        })

        // console.log(createDailyWorkload())
    }, []);

    const userAuthContext = React.useContext(JWTContext)

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title='Daily Workload ' secondary={<ProgressCircularControlled display={progressLoader} />} content={false}>
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
                                    <Details/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <ClientCaseLoad/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <ProjectClinicalActivities/>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <ProjectActivities/>
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
                                        {value < 3 && (
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
                                {value > 2 && (
                                    <AnimateButton>
                                        <Button color='secondary' variant='contained' size='large'
                                                onClick={(e) => handleChange(e, 1 + parseInt(value, 10))}>
                                            Submit
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

export default DailyWorkload;
