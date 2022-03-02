import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Box, Grid, IconButton, Tab, Tabs} from '@material-ui/core';

// project imports
import AssessmentData from './assessment-data';
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing, SHARE_INSTANCE_TYPE} from 'store/constant';
import caseManagerApi from 'store/api-calls/case-manager';

// assets
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import {setRetrievedClientAssessmentData} from "store/actions/caseManager/clientAssessmentActions";
import {useDispatch} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import IosShareOutlined  from "@material-ui/icons/IosShareOutlined";
import ShareIndex from "../../../common/communication/share";


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
        label: 'Client',
        icon: <DescriptionTwoToneIcon sx={{fontSize: '1.3rem'}}/>
    },
    {
        label: '-',
        icon: <AccountCircleTwoToneIcon sx={{fontSize: '1.3rem'}}/>
    }
];

// ===========================|| PROFILE 1 ||=========================== //

const ClientAssessmentDetail = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    const [assessmentDetailData, setAssessmentDetailData] = React.useState({});
    const dispatch = useDispatch();
    const {assessment_id} = useParams();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClientAssessmentEdit = () => (navigate(`/assessment/${assessment_id}/edit`));

    const fetchClientAssessmentData = async () => {
        const response = await caseManagerApi.retrieveClientAssessmentData(assessment_id)
        if ('status' in response && response.status === 200) {
            setAssessmentDetailData(response.data)
            console.log(response.data)
            dispatch(setRetrievedClientAssessmentData(response.data, assessment_id))
        }
    }

    useEffect(() => {
        fetchClientAssessmentData()
    }, []);


    return (
        <MainCard title="Assessement Data"
                  secondary={
                      <>
                          <Tooltip title="Edit Assessment">
                              <IconButton color="secondary" onClick={handleClientAssessmentEdit}>
                                  <EditTwoToneIcon sx={{fontSize: '1.5rem'}}/>
                              </IconButton>
                          </Tooltip>
                          <ShareIndex share_object_id={assessment_id}
                                      instance_type={SHARE_INSTANCE_TYPE.CaseManagerClientAssessment}
                                      followup_tooltip="Send Assessment Follow Up"
                                      referral_tooltip="Send Assessment Referral"
                          />
                      </>
                  }
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <AssessmentData assessmentDetailData={assessmentDetailData}/>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ClientAssessmentDetail;
