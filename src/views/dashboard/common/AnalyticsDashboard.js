import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Button, CardActions, CardContent, Divider, Grid, Typography} from '@material-ui/core';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

// assets
import TwitterIcon from '@material-ui/icons/Twitter';
import BusinessCenterTwoToneIcon from '@material-ui/icons/BusinessCenterTwoTone';
import DoneAllTwoToneIcon from '@material-ui/icons/DoneAllTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone';
import MarkEmailReadTwoToneIcon from '@material-ui/icons/MarkEmailReadTwoTone';

// style constant
const useStyles = makeStyles({
    projectTableMain: {
        position: 'relative',
        '&>*': {
            position: 'relative',
            zIndex: '5'
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '110px',
            width: '2px',
            height: '100%',
            zIndex: '1'
        }
    }
});

// ==========================|| DATA WIDGET - LATEST MESSAGES CARD ||========================== //

const AnalyticsDashboard = ({title}) => {
    const classes = useStyles();

    return (
        <MainCard title="Analytics" content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing} alignItems="center" className={classes.projectTableMain}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar color="info">
                                            <TrendingUpTwoToneIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography component="div" align="left" variant="h5">
                                            50 Client Caseload
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar color="error">
                                            <HowToRegTwoToneIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography component="div" align="left" variant="h5">
                                            20 New Client Registrations
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar color="success">
                                            <MarkEmailReadTwoToneIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography component="div" align="left" variant="h5">
                                            12 Client Follow-Up
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar color="primary">
                                            <AccountCircleTwoToneIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography component="div" align="left" variant="h5">
                                            5 Clients Discharged
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button variant="text" size="small">
                    View all Analytics
                </Button>
            </CardActions>
        </MainCard>
    );
};

AnalyticsDashboard.propTypes = {
    title: PropTypes.string
};

export default AnalyticsDashboard;
