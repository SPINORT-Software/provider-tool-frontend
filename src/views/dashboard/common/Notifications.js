import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {Avatar, Button, CardActions, CardContent, Divider, Grid, Typography} from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

// assets

import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';

import JWTContext from "contexts/JWTContext";
import {useDispatch, useSelector} from "react-redux";
import dashboardMessagesHelper from "utils/helpers/dashboard-messages";
import {setNewActivityNotificationForDashboard} from "store/actions/dashboard/dashboardActions"
import notificationsApi from 'store/api-calls/share';


// style constant
const useStyles = makeStyles((theme) => ({
    textActive: {
        width: '16px',
        height: '16px',
        verticalAlign: 'sub',
        color: theme.palette.success.main
    },
    timeIcon: {
        fontSize: '0.875rem',
        marginRight: '2px',
        verticalAlign: 'sub'
    },

}));

const ActivityNotifications = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dashboard_notifications = useSelector(store => store.dashboard.generalNotifications.list_dashboard)

    const jwtContext = React.useContext(JWTContext);
    const {ns: notificationServiceClient} = jwtContext;

    notificationServiceClient.onmessage = (e) => {
        const notificationData = JSON.parse(e.data)
        dashboard_notifications.unshift(notificationData.value)
        dispatch(setNewActivityNotificationForDashboard(dashboard_notifications))
    }

    const fetchAllNotifications = async () => {
        const response = await notificationsApi.listAllActivityNotifications()
        if ('results' in response && response.count > 0) {
            dispatch(setNewActivityNotificationForDashboard(response.results))
        }
    }

    useEffect(() => {
        fetchAllNotifications()
    }, [])


    const makeNotificationItem = () => {
        const notificationListForDashboard = dashboard_notifications.slice(0, 2)

        if (notificationListForDashboard.length > 0) {
            return notificationListForDashboard.map((notification) => (
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar alt="coverimage"/>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" component="div" variant="subtitle1">
                                {notification.by.user.fullname}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div">
                                        {dashboardMessagesHelper.prepareDashboardMessage(notification)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left" variant="caption">
                                        <WatchLaterTwoToneIcon className={classes.timeIcon}/>
                                        {notification.timesince}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ))
        }
        return (<Grid item xs={12}>
            No new notifications to show!
        </Grid>)
    }

    return (
        <MainCard title='Notifications' content={false} iconPrimary={AccountCircleTwoTone}>
            <PerfectScrollbar className={classes.ScrollHeight}>
                <CardContent>
                    <Grid container spacing={gridSpacing} alignItems="center">
                        {makeNotificationItem()}
                    </Grid>
                </CardContent>
            </PerfectScrollbar>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button variant="text" size="small">
                    View all Notifications
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default ActivityNotifications;
