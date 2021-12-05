import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import JWTContext from 'contexts/JWTContext';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    Autocomplete,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid, TextField,
} from '@material-ui/core';

import {useSelector, useDispatch} from "react-redux";

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import {SNACKBAR_OPEN} from 'store/actionTypes';

import caseManagerApi from 'store/api-calls/case-manager';
import {useFormik} from "formik";

import ProgressCircularControlled from 'views/ui/ProgressCircularControlled';
import setVisitorLogDetail from "store/actions/client/visitorLogActions";
import MaskedInput from 'react-text-mask';
import setCommunicationLogDetail from "../../../../store/actions/client/communicationLogActions";

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


const personCompletingList = [
    {label: 'Client', id: 'client'},
    {label: 'Spouse / Partner', id: 'client'},
    {label: 'Family Member', id: 'client'},
    {label: 'Neighbor / Friend', id: 'client'},
    {label: 'Volunteer', id: 'client'},
    {label: 'Home Health Aide', id: 'client'},
    {label: 'Other', id: 'other'},
];

const CommunicationLog = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);
    const [progressLoader, setProgressLoader] = React.useState(false);

    const dispatch = useDispatch()
    const communicationLogData = useSelector(store => store.client.communicationLogs.add)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setProgressLoader(true);  // Call this to show the loader for the current tab

        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: 'This is default message',
            variant: 'alert',
            alertSeverity: 'success', // error , success, warning
            anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
            transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
            close: false
        })

        // console.log(createDailyWorkload())
    }, []);
    const userAuthContext = React.useContext(JWTContext)
    const {user: {
        user_type_pk: clientUUID
    }} = userAuthContext;

    const formik = useFormik({
        initialValues: {
            date: communicationLogData.date,
            person_completing: communicationLogData.person_completing,
            person_completing_detail: communicationLogData.person_completing_detail,
            comments: communicationLogData.comments,
            client: clientUUID
        },
        validate: values => {
            dispatch(setCommunicationLogDetail(values))
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={8} md={8} sm={12}>
                <MainCard title='Communication Log' secondary={<ProgressCircularControlled display={progressLoader}/>}
                          content={false}>

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={8} md={8}>

                            <CardContent className={classes.cardPanels}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={8} sm={8}>
                                        <MaskedInput
                                            mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                            className="form-control"
                                            label="Date"
                                            guide={false}
                                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                               defaultValue=""/>}

                                            defaultValue={formik.values.date}
                                            onChange={formik.handleChange}
                                            name='date'
                                            id='date'
                                            value={formik.values.date}
                                        />
                                    </Grid>

                                    <Grid item xs={8} sm={8}>
                                        <Autocomplete
                                            disablePortal
                                            options={personCompletingList}
                                            name='person_completing'
                                            value={formik.values.person_completing}
                                            id='person_completing'
                                            onChange={(e, value) => {
                                                formik.setFieldValue('person_completing', value)
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Organization"/>}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            maxRows={20}
                                            name='person_completing_detail'
                                            id='person_completing_detail'
                                            label='Person Completing - Other'
                                            value={formik.values.person_completing_detail}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>


                                    <Grid item xs={12} lg={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            maxRows={20}
                                            multiline
                                            name='comments'
                                            id='comments'
                                            label='Comments: Provider details about your communication'
                                            value={formik.values.comments}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Divider/>

                    <CardActions>
                        <Grid container justifyContent='space-between' spacing={0}>
                            <Grid item alignContent='end'>
                                <AnimateButton>
                                    <Button color='secondary' variant='contained' size='large'
                                            onClick={(e) => handleChange(e, 1 + parseInt(value, 10))}>
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </CardActions>

                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CommunicationLog;
