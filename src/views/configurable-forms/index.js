import React from 'react';

import {Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography} from '@material-ui/core';

// project imports
import ConfigurableForm from './ConfigurableForm';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';
import * as actions from 'store/actions';
import {fetchSectionAttributes} from "store/actions";

import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';

// material-ui
import {makeStyles} from '@material-ui/styles';

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@material-ui/icons/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';

import SubCard from 'ui-component/cards/SubCard';

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
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
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

// ===========================|| PROFILE 2 ||=========================== //

const ConfigurableForms = ({uuid, title, sectionData}) => {
    const sectionNonConditionalAttributeGroups = sectionData.sections[uuid].groups;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const tabsOption = [];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const processAttributeGroups = () => {
        const steps = []
        const stepFields = []

        Object.entries(sectionNonConditionalAttributeGroups).map(attributeGroupItem => {
            const attributeGroupCode = attributeGroupItem[0]
            const attributeGroupData = attributeGroupItem[1]
            const title = attributeGroupData.group_detail.attribute_group_name;
            steps.push(title)

            tabsOption.push({
                label: title,
                icon: <DescriptionTwoToneIcon/>,
                caption: 'Add Caption to this group'
            })

            stepFields.push({
                title,
                defaultAttributes: attributeGroupData.default_attributes,
                childAttributeGroups: attributeGroupData.attribute_groups
            })
            return true;
        })

        return {steps, stepFields}
    }
    const attributeStepsAndGroupData = processAttributeGroups();

    // step options
    const {steps, stepFields} = attributeStepsAndGroupData;

    function getStepContent(value) {
        console.log(value, stepFields.length);
        if (value > (stepFields.length - 1)){
            value = 0;
            setValue(0)
        }
        return <TabPanel value={value} index={value}>
            <SubCard title={stepFields[value].title}>
                <ConfigurableForm groupData={stepFields[value]}/>
            </SubCard>
        </TabPanel>
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title={title} content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    className={classes.profileTab}
                                    variant="scrollable"
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
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle1" color="inherit"
                                                                sx={{textTransform: 'capitalize'}}>
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography component="div" variant="caption"
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
                                {getStepContent(value)}
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <CardActions>
                        <Grid container justifyContent="space-between" spacing={0}>
                            <Grid item>
                                {value > 0 && (
                                    <AnimateButton>
                                        <Button variant="outlined" size="large"
                                                onClick={(e) => handleChange(e, parseInt(value, 10) - 1)}>
                                            Back
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                            <Grid item>
                                {value < 3 && (
                                    <AnimateButton>
                                        <Button variant="contained" size="large"
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


const mapStateToProps = state => ({
    sectionData: state.sectionForm
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurableForms)
