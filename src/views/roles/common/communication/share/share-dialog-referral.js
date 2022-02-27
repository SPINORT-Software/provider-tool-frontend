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
    Typography,
    Grid, Tooltip,
    TextField,
    MenuItem,
    DialogContent, Tabs, Tab, Chip, Box, CardActions,
} from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import * as Yup from "yup";
import MainCard from 'ui-component/cards/MainCard';
import {useFormik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import MedicationOutlinedIcon from '@material-ui/icons/MedicationOutlined';
import SendIcon from "@material-ui/icons/Send";
// assets

import {
    gridSpacing,
    provider_types_value_label_list as providerTypesList,
    organizations_value_label_list as organizationsList,
    userSearchParamsForInternalReferralAndFollowUp,
    userSearchParamsForExternalReferralAndFollowUp, SHARE_COMMUNICATION_TYPE
} from "store/constant";
import searchApi from 'store/api-calls/search';
import shareApi from 'store/api-calls/share';
import {useDispatch, useSelector} from "react-redux";
import {setApplicationUserSearchList, setApplicationUserSearchParams} from "store/actions/search/applicationUser";
import {setExternalReferralShareData, setInternalReferralShareData} from "store/actions/share/referrals";
import {SNACKBAR_OPEN} from "../../../../../store/actionTypes";


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


// slide animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function ShareDialogReferral({open, handleClose, share_object_id, instance_type, from_user}) {
    const classes = useStyles();
    const [selectedTabValue, setSelectedTabValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);

    const dispatch = useDispatch();
    const applicationUserSearchList = useSelector(state => state.search.applicationUser.list)
    const applicationUserSearchParams = useSelector(state => state.search.applicationUser.params)
    const internalReferralData = useSelector(state => state.share.internalReferral)
    const externalReferralData = useSelector(state => state.share.externalReferral)

    const validationSchema = Yup.object({
        provider_type: Yup.string().required('Required field'),
    })

    useEffect(() => {
        /*
         * Set the Default values in Internal and External Referrals for the Selected Object
         */
        dispatch(setInternalReferralShareData({
            from_user,
            instance_type,
            instance_object: share_object_id
        }))

        dispatch(setExternalReferralShareData({
            from_user,
            instance_type,
            instance_object: share_object_id
        }))
    }, [])

    const formik_internal = useFormik({
        initialValues: {
            provider_type: ''
        },
        validate: values => {
            dispatch(setApplicationUserSearchParams(values))
            dispatch(setApplicationUserSearchList([]))
        }
    }, validationSchema);

    const formik_external = useFormik({
        initialValues: {
            organization: ''
        },
        validate: values => {
            dispatch(setApplicationUserSearchParams(values))
            dispatch(setApplicationUserSearchList([]))
        }
    });

    const handleTabChange = (event, newValue) => {
        setSelectedTabValue(newValue);

        if (newValue === 0) {
            // Nullify external param values for Internal referral user search
            dispatch(setApplicationUserSearchParams(userSearchParamsForExternalReferralAndFollowUp))
        } else {
            // Nullify internal param values for external referral user search
            dispatch(setApplicationUserSearchParams(userSearchParamsForInternalReferralAndFollowUp))
        }
    };

    const handleSendReferralClick = async (event, referralType) => {
        const formData = referralType === SHARE_COMMUNICATION_TYPE.INTERNAL_REFERRAL ? internalReferralData : externalReferralData;

        setProgressLoader(true);
        const response = await shareApi.sendCommunicationShare(formData);

        if (response && 'result' in response) {
            if (response.result === true) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Referral request is sent.',
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
                    message: 'Referral request could not be sent. Please try again',
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
                message: 'Referral request could not be sent. Please try again',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'left'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: true,
            })
        }

        setProgressLoader(false);
    }

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

    function getExternalReferralTabGrid() {
        return <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6} lg={6}>
                <MainCard title='External Referral' content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={7} lg={7}>
                                <TextField
                                    select
                                    label="Organization"
                                    fullWidth

                                    onChange={formik_external.handleChange}
                                    name='organization'
                                    id="organization"
                                    value={formik_external.values.organization}
                                >
                                    {organizationsList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={7} lg={7}>
                                <Autocomplete
                                    freeSolo
                                    id="internal-referral-application-user"
                                    disableClearable
                                    // options={applicationUserSearchList.map((option) => option.user.fullname)}
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
                                            dispatch(setExternalReferralShareData({
                                                to_user: id
                                            }))
                                        }
                                    }}
                                />

                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        <Button variant="contained" startIcon={<SendIcon/>} onClick={(event) => handleSendReferralClick(event, SHARE_COMMUNICATION_TYPE.EXTERNAL_REFERRAL)}>
                            Send External Referral
                        </Button>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>;
    }

    function getInternalReferralTabGrid() {
        return <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6} lg={6}>
                <MainCard title='Internal Referral' content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={7} lg={7}>
                                <TextField
                                    select
                                    label="Provider Type"
                                    fullWidth
                                    onChange={formik_internal.handleChange}
                                    name='provider_type'
                                    id="provider_type"
                                    value={formik_internal.values.provider_type}
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
                                    id="internal-referral-application-user"
                                    disableClearable
                                    // options={applicationUserSearchList.map((option) => option.user.fullname)}
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
                                            dispatch(setInternalReferralShareData({
                                                to_user: id
                                            }))
                                        }
                                    }}
                                />

                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        <Button variant="contained" startIcon={<SendIcon/>} onClick={(event) => handleSendReferralClick(event, SHARE_COMMUNICATION_TYPE.INTERNAL_REFERRAL)}>
                            Send Internal Referral
                        </Button>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>;
    }

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
                            Send Referrals
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <Tabs value={selectedTabValue} variant="standard" onChange={handleTabChange}>
                        <Tab
                            component={RouterLink}
                            to="#"
                            icon={<PersonOutlineTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
                            label="Internal Referral"
                            {...a11yProps(0)}
                        />
                        <Tab
                            component={RouterLink}
                            to="#"
                            icon={<MedicationOutlinedIcon sx={{fontSize: '1.3rem'}}/>}
                            label="External Referral"
                            {...a11yProps(1)}
                        />
                    </Tabs>

                    <TabPanel value={selectedTabValue} index={0}>
                        {getInternalReferralTabGrid()}
                    </TabPanel>

                    <TabPanel value={selectedTabValue} index={1}>
                        {getExternalReferralTabGrid()}
                    </TabPanel>
                </DialogContent>
            </Dialog>
        </div>
    );
}
