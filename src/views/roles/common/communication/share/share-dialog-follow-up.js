import React, {useEffect} from 'react';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    Slide,
    Toolbar,
    CardContent,
    CardActions,
    Typography,
    Grid, Tooltip, TextField, MenuItem, DialogContent, Tabs, Tab, Box
} from '@material-ui/core';


// assets
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";

import {
    gridSpacing,
    provider_types_followup_value_label_list as providerTypesList,
    organizations_value_label_list as organizationsListExternalFollowUp,
    mode_of_communication_value_label_list as modeOfCommunicationList,
    organizations_value_label_list as organizationsList, SHARE_COMMUNICATION_TYPE
} from "store/constant";

import MainCard from 'ui-component/cards/MainCard';
import {useFormik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import MedicationOutlinedIcon from "@material-ui/icons/MedicationOutlined";
import {
    setApplicationUserSearchList,
    setApplicationUserSearchParams
} from "store/actions/search/applicationUser";

import {setInternalFollowUpShareData, setExternalFollowUpShareData} from "store/actions/share/followup";
import searchApi from "store/api-calls/search";
import Autocomplete from "@material-ui/core/Autocomplete";
import shareApi from "../../../../../store/api-calls/share";
import {SNACKBAR_OPEN} from "../../../../../store/actionTypes";

// style constant
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },

    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    fulldialog: {
        '& .MuiPaper-root': {
            padding: '0px'
        }
    }
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 3
                    }}
                >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ShareDialogFollowUp({open, handleClose, share_object_id, instance_type, from_user}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);

    const dispatch = useDispatch();
    const applicationUserSearchList = useSelector(state => state.search.applicationUser.list)
    const applicationUserSearchParams = useSelector(state => state.search.applicationUser.params)
    const internalFollowUpData = useSelector(state => state.share.internalFollowup)
    const externalFollowUpData = useSelector(state => state.share.externalFollowup)

    useEffect(() => {
        /*
         * Set the Default values in Internal and External Referrals for the Selected Object
         */
        dispatch(setInternalFollowUpShareData({
            from_user,
            instance_type,
            instance_object: share_object_id
        }))

        dispatch(setExternalFollowUpShareData({
            from_user,
            instance_type,
            instance_object: share_object_id
        }))
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik_internal = useFormik({
        initialValues: {
            mode: internalFollowUpData.mode,
            discussion_details: ''
        },
        validate: values => {
            dispatch(setInternalFollowUpShareData(values))
        }
    });

    const formik_external = useFormik({
        initialValues: {
            mode: externalFollowUpData.mode,
            discussion_details: ''
        },
        validate: values => {
            dispatch(setExternalFollowUpShareData(values))
        }
    });

    const formik_user_search = useFormik({
        initialValues: {
            provider_type: '',
            organization: '',
        },
        validate: values => {
            dispatch(setApplicationUserSearchParams(values))
            dispatch(setApplicationUserSearchList([]))
        }
    });

    const fetchSearchUsersList = async (formData) => {
        const response = await searchApi.searchApplicationUsers(formData);
        if ('result' in response && response.result === true) {
            dispatch(setApplicationUserSearchList(response.data))
        } else {
            dispatch(setApplicationUserSearchList([]))
        }
    }

    const handleClientKeyInput = async (event) => {
        const searchValue = event.target.value;

        if (searchValue.length > 0) {
            dispatch(setApplicationUserSearchParams({
                name: searchValue
            }))

            // This new object is created and sent to the request function to avoid delays in dispatch retrieval
            const updatedNameAndFormData = {
                ...applicationUserSearchParams,
                name: searchValue
            }
            fetchSearchUsersList(updatedNameAndFormData)
        } else {
            dispatch(setApplicationUserSearchList([]))
        }
    }

    const handleSendFollowUpClick = async (event, referralType) => {
        const formData = referralType === SHARE_COMMUNICATION_TYPE.INTERNAL_FOLLOWUP ? internalFollowUpData : externalFollowUpData;

        setProgressLoader(true);
        const response = await shareApi.sendCommunicationShare(formData);

        if (response && 'result' in response) {
            if (response.result === true) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Follow up request is sent.',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'left'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Follow up request could not be sent. Please try again',
                    variant: 'alert',
                    alertSeverity: 'error', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'left'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: true,
                })
            }
        } else {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Follow up request could not be sent. Please try again',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'left'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }

        setProgressLoader(false);
    }

    const getInternalFollowUp = () => (
        <Grid item xs={12} md={6} lg={5}>
            <MainCard title='Internal Follow Up Discussion' content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={7} lg={8}>
                            <TextField
                                select
                                label="Provider Type"
                                fullWidth
                                onChange={formik_user_search.handleChange}
                                name='provider_type'
                                id="provider_type"
                                value={formik_user_search.values.provider_type}
                            >
                                {providerTypesList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={7} lg={7}>
                            <Autocomplete
                                freeSolo
                                id="internal-followup-application-user"
                                disableClearable
                                options={applicationUserSearchList.map((option) => ({
                                        label: option.user.fullname,
                                        id: option.app_user_id
                                    })
                                )}
                                onKeyUpCapture={handleClientKeyInput}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search User"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                                onChange={(event, appuser) => {
                                    if (appuser) {
                                        const {id} = appuser;
                                        dispatch(setInternalFollowUpShareData({
                                            to_user: id
                                        }))
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={7} lg={8}>
                            <TextField
                                select
                                label="Mode Of Communication"
                                fullWidth

                                onChange={formik_internal.handleChange}
                                name='mode_of_communication'
                                id="mode_of_communication"
                                value={formik_internal.values.mode_of_communication}
                            >
                                {modeOfCommunicationList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid item xs={7} lg={8}>
                            <TextField
                                id="discussion_details"
                                name="discussion_details"
                                variant="outlined"
                                label="Discussion Details"
                                multiline
                                rows={6}
                                maxRows={15}
                                fullWidth
                                onChange={formik_internal.handleChange}
                                value={formik_internal.values.discussion_details}
                            />
                        </Grid>

                    </Grid>
                </CardContent>
                <CardActions>
                    <Button variant="contained" startIcon={<SendIcon/>} onClick={(event) => handleSendFollowUpClick(event, SHARE_COMMUNICATION_TYPE.INTERNAL_FOLLOWUP)}>
                        Send Internal Follow Up
                    </Button>
                </CardActions>
            </MainCard>
        </Grid>
    )

    const getExternalFollowUp = () => (
        <Grid item xs={12} md={4} lg={5} justifyContent="center">
            <MainCard title='External Follow Up Discussion' content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={7} lg={8}>
                            <TextField
                                select
                                label="Organization"
                                fullWidth

                                onChange={formik_user_search.handleChange}
                                name='organization'
                                id="organization"
                                value={formik_user_search.values.organization}
                            >
                                {organizationsListExternalFollowUp.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={7} lg={7}>
                            <Autocomplete
                                freeSolo
                                id="external-followup-application-user"
                                disableClearable
                                options={applicationUserSearchList.map((option) => ({
                                        label: option.user.fullname,
                                        id: option.app_user_id
                                    })
                                )}
                                onKeyUpCapture={handleClientKeyInput}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search User"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                                onChange={(event, appuser) => {
                                    if (appuser) {
                                        const {id} = appuser;
                                        dispatch(setExternalFollowUpShareData({
                                            to_user: id
                                        }))
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={7} lg={8}>
                            <TextField
                                select
                                label="Mode Of Communication"
                                fullWidth
                                onChange={formik_external.handleChange}
                                name='mode'
                                id="mode"
                                value={formik_internal.values.mode}
                            >
                                {modeOfCommunicationList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid item xs={7} lg={8}>
                            <TextField
                                onChange={formik_external.handleChange}
                                name='discussion_details'
                                id="discussion_details"
                                variant="outlined"
                                label="Discussion Details"
                                multiline
                                rows={6}
                                maxRows={15}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button variant="contained" startIcon={<SendIcon/>} onClick={(event) => handleSendFollowUpClick(event, SHARE_COMMUNICATION_TYPE.EXTERNAL_FOLLOWUP)}>
                        Send External Follow Up
                    </Button>
                </CardActions>
            </MainCard>
        </Grid>
    )

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}
                    className={classes.fulldialog}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h3" color="inherit" className={classes.title}>
                            Send Follow Up Discussions
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <Tabs value={value} variant="standard" onChange={handleChange}>
                        <Tab
                            component={RouterLink}
                            to="#"
                            icon={<PersonOutlineTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
                            label="Internal Follow Up"
                            {...a11yProps(0)}
                        />
                        <Tab
                            component={RouterLink}
                            to="#"
                            icon={<MedicationOutlinedIcon sx={{fontSize: '1.3rem'}}/>}
                            label="External Follow Up"
                            {...a11yProps(1)}
                        />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Grid container spacing={gridSpacing} justifyContent="left">
                            {getInternalFollowUp()}
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Grid container spacing={gridSpacing} justifyContent="left">
                            {getExternalFollowUp()}
                        </Grid>
                    </TabPanel>
                </DialogContent>
            </Dialog>
        </div>
    );
}
