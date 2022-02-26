import React from 'react';

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
import IosShareIcon from '@material-ui/icons/IosShare';
import CloseIcon from '@material-ui/icons/Close';
import {
    gridSpacing,
    provider_types_followup_value_label_list as providerTypesList,
    organizations_value_label_list as organizationsListExternalFollowUp,
    mode_of_communication_value_label_list as modeOfCommunicationList,
    organizations_value_label_list as organizationsList
} from "store/constant";

import MainCard from 'ui-component/cards/MainCard';
import {useFormik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import MedicationOutlinedIcon from "@material-ui/icons/MedicationOutlined";


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

export default function ShareDialogFollowUp({open, handleClose}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formik_internal = useFormik({
        initialValues: {
            type_of_provider: ''
        },
        validate: values => {
            console.log(values)
        }
    });

    const formik_external = useFormik({
        initialValues: {
            organization: ''
        },
        validate: values => {
            console.log(values)
        }
    });

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

                                onChange={formik_external.handleChange}
                                name='organization'
                                id="organization"
                                value={formik_external.values.organization}
                            >
                                {organizationsListExternalFollowUp.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid item xs={7} lg={8}>
                            <TextField fullWidth/>
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
                    <Button variant="contained" startIcon={<SendIcon/>}>
                        Send Follow Up
                    </Button>
                </CardActions>
            </MainCard>
        </Grid>
    )

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
                                onChange={formik_internal.handleChange}
                                name='type_of_provider'
                                id="type_of_provider"
                                value={formik_internal.values.mode_of_assessment}
                            >
                                {providerTypesList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={7} lg={8}>
                            <TextField fullWidth/>
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
                    <Button variant="contained" startIcon={<SendIcon/>}>
                        Send Follow Up
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
