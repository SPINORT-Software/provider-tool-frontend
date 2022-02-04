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
    Typography, IconButton, List, ListItemIcon, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';

import {useNavigate, useParams} from 'react-router-dom';

// project imports
import Details from '../forms/details';

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

import clinicianApi from 'store/api-calls/clinician';


import {retrieveDailyWorkload} from "store/actions/clinician/dailyWorkloadActions";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Tooltip from '@material-ui/core/Tooltip';
import SubCard from "ui-component/cards/SubCard";
import ListItemButton from "@material-ui/core/ListItemButton";
import IosShareOutlined from "@material-ui/icons/IosShareOutlined";
import { FormattedMessage } from 'react-intl';

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

const DailyWorkload = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [progressLoader, setProgressLoader] = React.useState(false);
    const [retrievedItemDailyWorkload, setRetrievedItemDailyWorkload] = React.useState(false);

    const {workload_id} = useParams();

    const workloadValueFields = {
        "workload_details": [
            "daily_workload_date",
            "service_recipient_travel",
            "functional_center"
        ],
        "workload-caseload": [
            "client_caseload_casemanagement_number_clients",
            "client_caseload_casemanagement_total_time",
            "client_caseload_regular_number_clients",
            "client_caseload_regular_total_time",
        ]
    }

    useEffect(async () => {
        const response = await clinicianApi.retrieveDailyWorkload(workload_id);

        if ('result' in response && response.result === true && 'data' in response) {
            dispatch(retrieveDailyWorkload(workload_id, response.data))
            setRetrievedItemDailyWorkload(response.data)
        }
    }, []);

    const handleEdit = (event) => {
        navigate(`/workload/${workload_id}/edit`)
    };

    const renderDetail = () => {
        const fieldsMap = (fields) => (
            fields.map(field => (
                <ListItemButton>
                    <ListItemText primary={<Typography variant="subtitle1"><FormattedMessage id={field} /></Typography>}/>
                    <ListItemSecondaryAction>
                        <Typography variant="body1" align="right">
                            {retrievedItemDailyWorkload[field]}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItemButton>
            ))
        )

        return Object.keys(workloadValueFields).map(workloadKey => {
            const fields = workloadValueFields[workloadKey];
            return (
                <Grid item lg={6} xs={8}>
                    <SubCard title={<FormattedMessage id={workloadKey} />}>
                        <List component="nav">
                            {fieldsMap(fields)}
                            <Divider/>
                        </List>
                    </SubCard>
                </Grid>
            )
        })
    }

    return (
        <MainCard title="Workload Detail"
                  secondary={
                      <>
                          <Tooltip title="Edit Workload">
                              <IconButton color="secondary" onClick={handleEdit}>
                                  <EditTwoToneIcon sx={{fontSize: '1.5rem'}}/>
                              </IconButton>
                          </Tooltip>
                          <Tooltip title="Send Workload">
                              <IconButton color="secondary">
                                  <IosShareOutlined sx={{fontSize: '1.5rem'}}/>
                              </IconButton>
                          </Tooltip>
                      </>
                  }
        >
            <Grid container spacing={gridSpacing}>
                {renderDetail()}
            </Grid>
        </MainCard>
    )
};

export default DailyWorkload;
