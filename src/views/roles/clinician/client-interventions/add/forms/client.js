import React, {useEffect, useState} from 'react';

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
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import ListItemButton from "@material-ui/core/ListItemButton";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@material-ui/icons/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@material-ui/icons/PinDropTwoTone";
import {SNACKBAR_OPEN} from "store/actionTypes";

import commonApi from "store/api-calls/common";
import {setSearchUsersList} from "store/actions/messagingActions";

import JWTContext from "contexts/JWTContext";


const ClientSelect = ({setSelectedClientValueToStore, storeData}) => {
    const dispatch = useDispatch()
    const [clientSelectValues, setClientSelectValues] = React.useState([]);
    const [clientListOpen, setClientListOpen] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState('');
    const [isRetrieveMode, setIsRetrieveMode] = useState(false);
    const [title, setTitle] = useState("Select Client for Assessment");

    // Redux data
    const formik = useFormik({
        initialValues: {
            client: storeData.client
        },
        validate: values => {
            console.log(values)
        }
    });


    // Render Functions
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

    const displayClientSelectAutoComplete = () => {
        if (!isRetrieveMode) {
            return (<Grid item xs={12}>
                <Autocomplete
                    open={clientListOpen}
                    disablePortal
                    options={clientSelectValues}
                    name='client_select'
                    id='client_select'
                    noOptionsText='No client found with the provided value.'
                    onKeyUp={handleClientKeyInput}
                    onBlur={(event) => setClientListOpen(false)}
                    onChange={(event, client) => {
                        if (client) {
                            const {id: clientUUID} = client;
                            dispatch(setSelectedClientValueToStore(clientUUID));
                            setClientListOpen(false);
                        }
                    }}
                    value={formik.values.client ? formik.values.client : ''}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>)
        }
        return <></>
    }

    const displaySelectedClientDetail = () => (<Grid item xs={12}>
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

    </Grid>)


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={7}>
                <MainCard title={title}>
                    <Grid container spacing={2} alignItems="center">
                        {displayClientSelectAutoComplete()}

                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ClientSelect;
