import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
    Box,
    Button,
    CardContent,
    Chip,
    Divider, Fab,
    Grid,
    LinearProgress,
    List,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, Tooltip,
    Typography
} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import {gridSpacing} from 'store/constant';

// assets
import {IconEdit} from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import AttachmentIcon from '@material-ui/icons/AttachmentTwoTone';
import PageViewIcon from '@material-ui/icons/PageviewTwoTone';

import Avatar3 from 'assets/images/users/avatar-3.png';
import AddIcon from "@material-ui/icons/AddTwoTone";
import AssessmentForms from './assessment-forms';
import LayersTwoToneIcon from "@material-ui/icons/LayersTwoTone";

const AssessmentData = ({assessmentDetailData}) => {
    const [assessmentFormsDialogOpen, setAssessmentFormsDialogOpen] = React.useState(false);
    const handleOpenAssessmentFormsDialog = () => {
        setAssessmentFormsDialogOpen(true);
    };
    const handleCloseAssessmentFormsDialog = () => {
        setAssessmentFormsDialogOpen(false);
    };

    const assessmentTypes = {
        'NEW_CASE_CLIENT_EXISTING_EMC_NO_REASSESS': ['existing_assessment'],
        'NEW_CASE_CLIENT_EXISTING_EMC_REASSESS': ['existing_assessment', 'reassessment'],
        'NEW_CASE_CLIENT_NEW_EXTRA_MURAL_CLIENT': ['newextramuralclient_assessment'],
        'EXISTING_CASE_CLIENT_REASSESS': ['reassessment']
    }
    const noDisplayAssessmentTypeDataKeys = [
        'assessment_id',
        'assessment_forms'
    ]

    const renderAssessmentTypeDataFields = (typeDataFields) => {
        let assessmentTypeDataFieldsJSX = <></>;
        return Object.keys(typeDataFields).map((typeDataFieldKey, index) => {
            if (noDisplayAssessmentTypeDataKeys.includes(typeDataFieldKey) === false) {
                assessmentTypeDataFieldsJSX =
                    <ListItemButton key={`list-data-item-${typeDataFieldKey}`}>
                        <ListItemIcon>
                            <MailTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">{typeDataFieldKey}</Typography>}/>
                        <ListItemSecondaryAction>
                            <Typography variant="body" align="right">
                                {typeDataFields[typeDataFieldKey]}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>

            }

            if (typeDataFieldKey === "assessment_forms") {
                assessmentTypeDataFieldsJSX =
                    <ListItemButton key={`list-button-item-${typeDataFieldKey}`}>
                        <ListItemIcon>
                            <AttachmentIcon sx={{fontSize: '1.3rem'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">{typeDataFieldKey}</Typography>}/>
                        <ListItemSecondaryAction>
                            <AssessmentForms key={`assessment-form-item-${typeDataFieldKey}`} forms={typeDataFields[typeDataFieldKey]} open={assessmentFormsDialogOpen}
                                             handleCloseDialog={handleCloseAssessmentFormsDialog}/>
                        </ListItemSecondaryAction>
                    </ListItemButton>

            }

            return <div key={index}>
                {assessmentTypeDataFieldsJSX}
            </div>
        })
    }

    let assessmentStatusJSX = <></>;
    const switchAssessmentTypeRender = (assessmentStatus) => {
        const assessmentTypeKeys = assessmentTypes[assessmentStatus]

        assessmentStatusJSX = assessmentTypeKeys.map(typeKey => (
            <Grid item lg={10} xs={12} key={`grid-key-${typeKey}`}>
                <SubCard title={typeKey}>
                    <List component="nav">
                        {renderAssessmentTypeDataFields(assessmentDetailData[typeKey])}
                    </List>
                </SubCard>
            </Grid>
        ))

        return (<Grid container spacing={gridSpacing}>
            {assessmentStatusJSX}
        </Grid>)
    }

    const renderAssessmentData = () => {
        if (assessmentDetailData && assessmentDetailData.assessment_status) {
            return (<Grid item lg={8} xs={12}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Assessement Data">
                            {switchAssessmentTypeRender(assessmentDetailData.assessment_status)}
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>)
        }
        return <></>
    }

    const renderClient = () => (
        <Grid item lg={4} xs={12}>
            <SubCard
                title={
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1"/>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="subtitle1">
                                Client Name
                            </Typography>
                        </Grid>
                    </Grid>
                }
            >
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton>
                        <ListItemIcon>
                            <MailTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Email</Typography>}/>
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                demo@sample.com
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton>
                        <ListItemIcon>
                            <PhonelinkRingTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>}/>
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                (+99) 9999 999 999
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton>
                        <ListItemIcon>
                            <PinDropTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Location</Typography>}/>
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                Melbourne
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                </List>
            </SubCard>
        </Grid>
    )

    return (<Grid container spacing={gridSpacing}>
        {renderClient()}

        {renderAssessmentData()}
    </Grid>)
};

export default AssessmentData;
