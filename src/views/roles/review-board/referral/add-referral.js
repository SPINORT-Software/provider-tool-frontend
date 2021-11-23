import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@material-ui/core';

// project imports
import ReviewReferralDetails from './forms/referral-details';
import CaseManagementDecision from './forms/decision';
import ClientDetail from './forms/client-detail';
import ReferralForms from './forms/referral-forms';
import CasePresentationForm from './forms/case-presentation-form';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

import { Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@material-ui/icons/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';



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
        label: 'Client',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Enter Client Details'
    },
    {
        label: 'Referral Details',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Add Referral Details'
    },
    {
        label: 'Referral Forms',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Upload Referral Forms'
    },
    {
        label: 'Case Presentation Form',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Upload the Presentation Form'
    },
    {
        label: 'Decision',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Choose Client Referral Decision'
    }
];

// ===========================|| PROFILE 2 ||=========================== //

const ReviewBoardReferralCreate = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const clientFormik = useFormik({
        initialValues: {
            referral_client_first_name: '',
            referral_client_last_name: '',
            referral_client_email: ''
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title='Client Referral' content={false}>
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
                        <Grid item xs={12} lg={9}>
                            <CardContent className={classes.cardPanels}>
                                <TabPanel value={value} index={0}>
                                    <ClientDetail/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <ReviewReferralDetails />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <ReferralForms />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <CasePresentationForm />
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <CaseManagementDecision />
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
                            </Grid>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ReviewBoardReferralCreate;
