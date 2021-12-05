import React, {useEffect} from 'react';

// material-ui
import {
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Radio,
    RadioGroup,
    Autocomplete,
    FormHelperText,
    FormGroup,
    Checkbox,
    Typography,
    Chip,
    List,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction, Divider
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {
    setAssessmentCaseManagerDetail,
    setAssessmentClientDetail,
    setAssessmentClientStatus
} from "store/actions/caseManager/clientAssessmentActions";
import commonApi from "store/api-calls/common";
import {setSearchUsersList} from "store/actions/messagingActions";
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';

import ListItemButton from "@material-ui/core/ListItemButton";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@material-ui/icons/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@material-ui/icons/PinDropTwoTone";
import JWTContext from "contexts/JWTContext";
import {SNACKBAR_OPEN} from "../../../../../store/actionTypes";

const ClientSelect = () => {
    const dispatch = useDispatch()
    const clientAssessmentStore = useSelector(state => state.caseManager.clientAssessment)
    const clientAssessmentTypeStatus = clientAssessmentStore.add.assessment.client_status

    const {
        user: {
            user_type_pk: caseManagerUUID
        }
    } = React.useContext(JWTContext);

    const [clientSelectValues, setClientSelectValues] = React.useState([]);
    const [clientListOpen, setClientListOpen] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState('');

    useEffect(() => {
        dispatch(setAssessmentCaseManagerDetail(caseManagerUUID))
    }, []);

    const formik = useFormik({
        initialValues: {
            client_status: clientAssessmentTypeStatus
        },
        validate: values => {
            // eslint-disable-next-line camelcase
            const {client_status} = values;
            dispatch(setAssessmentClientStatus(client_status));
            dispatch(setAssessmentCaseManagerDetail(caseManagerUUID))
        }
    });

    const prepareClientList = (clientList) => {
        if (clientList && clientList.length > 0) {
            const clientListOptions = clientList.map((client, index) => (
                {label: client.fullname, id: client.user_type_pk}
            ))
            return clientListOptions
        }
        return []
    }

    const handleClientKeyInput = async (event) => {
        const searchValue = event.target.value;
        if (searchValue.length > 0) {
            setClientListOpen(true)
            const response = await commonApi.searchClient(searchValue);
            const clientListOptions = prepareClientList(response)
            setClientSelectValues(clientListOptions)
        } else {
            setClientListOpen(false)
            setClientSelectValues([])
        }
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}  lg={7}>
                <MainCard title="Select Client for Assessment">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Autocomplete
                                open={clientListOpen}
                                disablePortal
                                options={clientSelectValues}
                                name='referral_source'
                                id='referral_source'
                                noOptionsText='No client found with the provided value.'
                                onKeyUp={handleClientKeyInput}
                                onBlur={(event) => setClientListOpen(false)}
                                onChange={(event, client) => {
                                    if (client) {
                                        const {id: clientUUID} = client;
                                        dispatch(setAssessmentClientDetail(clientUUID));
                                        setClientListOpen(false);
                                    }
                                }}
                                value={formik.values.client}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item lg={12} xs={12} sm={12} md={12}>
                                <SubCard
                                    title={
                                        <Grid container spacing={2} alignItems="center">

                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" variant="subtitle1">
                                                    Client Name Placeholder
                                                </Typography>
                                                <Typography align="left" variant="subtitle2">
                                                    UI/UX Designer
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
                                                    Client Email Placeholder
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
                                            <ListItemText
                                                primary={<Typography variant="subtitle1">Location</Typography>}/>
                                            <ListItemSecondaryAction>
                                                <Typography variant="subtitle2" align="right">
                                                    Client location Placeholder
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                    </List>
                                </SubCard>
                            </Grid>

                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}  lg={5}>

                <Grid container spacing={2} alignItems="center">

                    <Grid item xs={12} md={12}>
                        <SubCard title='New Case Management Client (Active)'>
                            <Grid container spacing={12}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-label='client-status'
                                            name='client_status'
                                            id="client_status"
                                            onChange={formik.handleChange}
                                            value={formik.values.client_status}
                                        >
                                            <FormControlLabel value='NEW_CASE_CLIENT_EXISTING_EMC_NO_REASSESS'
                                                              control={<Radio/>}
                                                              label='Existing Extra-Mural Client – No need to re-assess '/>
                                            <FormControlLabel value='NEW_CASE_CLIENT_EXISTING_EMC_REASSESS'
                                                              control={<Radio/>}
                                                              label='Existing Extra-Mural Client - Need to re-assess'/>
                                            <FormControlLabel value='NEW_CASE_CLIENT_NEW_EXTRA_MURAL_CLIENT'
                                                              control={<Radio/>}
                                                              label='New Extra-Mural Client'/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <SubCard title='Existing Case Management Client'>
                            <Grid container spacing={12}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-label='client-status'
                                            // value={valueLabel}
                                            // onChange={(e) => setValueLabel(e.target.value)}
                                            id="client_status"
                                            onChange={formik.handleChange}
                                            value={formik.values.client_status}
                                            name='client_status'
                                        >
                                            <FormControlLabel value='EXISTING_CASE_CLIENT_REASSESS'
                                                              control={<Radio/>}
                                                              label='Need to re-assess'/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    );
};

export default ClientSelect;
