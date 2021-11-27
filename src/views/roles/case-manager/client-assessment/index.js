import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography} from '@material-ui/core';

// project imports
import ClientSelect from './forms/client';
import ExistingExtraMural from './forms/conditional-display/existing-extra-mural';
import NewExtraMural from './forms/conditional-display/new-extra-mural';
import ClientReasessment from './forms/conditional-display/client-reassessment';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

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
const tabsOption = [];

// ===========================|| PROFILE 2 ||=========================== //

const ClientAssessment = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const clientAssessmentStore = useSelector(state => state.caseManager.clientAssessment)
    const dispatch = useDispatch();

    const clientAssessmentTypeStatus = clientAssessmentStore.add.assessment.client_status;

    const setAssessmentTypeOptions = () => {
        tabsOption.length = 0;

        tabsOption.push(
            {
                label: 'Client',
                icon: <DescriptionTwoToneIcon/>,
                caption: 'Enter Client Details'
            }
        )

        switch (clientAssessmentTypeStatus) {
            case 'NEW_CASE_CLIENT_EXISTING_EMC_NO_REASSESS':
                return tabsOption.push(
                    {
                        label: 'Existing Extra-Mural Client',
                        icon: <DescriptionTwoToneIcon/>,
                        caption: 'Existing Client Details'
                    }
                )

            case 'NEW_CASE_CLIENT_EXISTING_EMC_REASSESS':
                return tabsOption.push(
                    {
                        label: 'Existing Extra-Mural Client',
                        icon: <DescriptionTwoToneIcon/>,
                        caption: 'Existing Client Details'
                    },
                    {
                        label: 'Client Re-Assessment',
                        icon: <DescriptionTwoToneIcon/>,
                        caption: 'Client Reassessment Details'
                    }
                )


            case 'NEW_CASE_CLIENT_NEW_EXTRA_MURAL_CLIENT':
                return tabsOption.push(
                    {
                        label: 'New Extra-Mural Client',
                        icon: <CreditCardTwoToneIcon/>,
                        caption: 'New Client Details'
                    }
                )

            case 'EXISTING_CASE_CLIENT_REASSESS':
                return tabsOption.push(
                    {
                        label: 'Client Re-Assessment',
                        icon: <DescriptionTwoToneIcon/>,
                        caption: 'Client Reassessment Details'
                    }
                )
            default:
                return false
        }
    }

    const switchAssessmentTypeRender = () => {
        switch (clientAssessmentTypeStatus) {
            case 'NEW_CASE_CLIENT_EXISTING_EMC_NO_REASSESS':
                return <fragment>
                    <TabPanel value={value} index={1}>
                        <ExistingExtraMural/>
                    </TabPanel>
                </fragment>
            case 'NEW_CASE_CLIENT_EXISTING_EMC_REASSESS':
                return <fragment>
                    <TabPanel value={value} index={1}>
                        <ExistingExtraMural/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ClientReasessment/>
                    </TabPanel>
                </fragment>

            case 'NEW_CASE_CLIENT_NEW_EXTRA_MURAL_CLIENT':
                return <fragment><TabPanel value={value} index={1}>
                    <NewExtraMural/>
                </TabPanel>
                </fragment>

            case 'EXISTING_CASE_CLIENT_REASSESS':
                return <fragment>
                    <TabPanel value={value} index={1}>
                        <ClientReasessment/>
                    </TabPanel>
                </fragment>
            default:
                return false
        }
    }

    setAssessmentTypeOptions();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title='Client Assessment' content={false}>
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
                                    <ClientSelect/>
                                </TabPanel>

                                {switchAssessmentTypeRender()}
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Divider/>

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
                                {value < 3 && (
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

export default ClientAssessment;
