import React from 'react';

// material-ui
import {useTheme, makeStyles} from '@material-ui/styles';
import {Grid, Typography, useMediaQuery} from '@material-ui/core';
import {gridSpacing} from 'store/constant';

// project imports
import Notifications from '../common/Notifications';
import AnalyticsDashboard from '../common/AnalyticsDashboard';
import ClientRecordsTable from '../common/ClientRecordsTable';
import ClientMonitoringTable from '../common/ClientMonitoringTable';
import ClientReferralsTable from '../common/ClientReferralsTable';
import MessagesDashboard from '../common/MessagesDashboard';


// style constant
const useStyles = makeStyles((theme) => ({
    flatCardBody: {
        '& >div': {
            padding: '0px !important'
        },
        '& svg': {
            width: '50px',
            height: '50px',
            color: theme.palette.secondary.main,
            borderRadius: '14px',
            padding: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
        }
    },
    flatCardBlock: {
        padding: '20px',
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    }
}));

// ===========================|| ANALYTICS DASHBOARD ||=========================== //

const Analytics = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={3} lg={3} md={3}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item >
                                <Notifications/>
                            </Grid>
                            <Grid item >
                                <MessagesDashboard />
                            </Grid>
                            <Grid item >
                                <AnalyticsDashboard/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={9} lg={9} md={9}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={12}>
                                <ClientMonitoringTable/>
                            </Grid>
                            <Grid item lg={12}>
                                <ClientReferralsTable/>
                            </Grid>
                            <Grid item lg={12}>
                                <ClientRecordsTable/>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
};

export default Analytics;
