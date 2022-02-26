import React, {useEffect} from 'react';

// material-ui
import {
    Avatar, Button, CardActions, CardContent,
    Chip, Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

// assets
import MainCard from 'ui-component/cards/MainCard';

import notificationsApi from 'store/api-calls/share';
import {useDispatch, useSelector} from "react-redux";
import {setExternalReferralData} from "store/actions/dashboard/dashboardActions";
import {convert_backend_datetime_to_ui} from "utils/helpers/datetime";

const ExternalReferrals = () => {
    const dispatch = useDispatch();
    const internalReferralStore = useSelector(state => state.dashboard.externalReferrals.list)

    const fetchInternalReferralData = async () => {
        const response = await notificationsApi.listReferralsForCurrentUser('external');
        if ('result' in response && response.result) {
            dispatch(setExternalReferralData(response.data))
        } else {
            dispatch(setExternalReferralData([]))
        }
    }

    useEffect(() => {
        fetchInternalReferralData()
    }, []);

    function getTableHead() {
        return <TableHead>
            <TableRow>
                <TableCell>Sender</TableCell>
                <TableCell sx={{pl: 3}}>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right" sx={{pr: 3}}>
                    Action
                </TableCell>
            </TableRow>
        </TableHead>;
    }

    function getTableBody() {
        return <TableBody>
            {internalReferralStore.slice(0, 3).map((row, index) => (
                <TableRow hover key={index}>
                    <TableCell sx={{pl: 3}}>
                        <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                            <Grid item xs zeroMinWidth>
                                <Typography component="div" variant="subtitle1">
                                    {row.communication_by.first_name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell>{row.content_type}</TableCell>
                    <TableCell>{convert_backend_datetime_to_ui(row.communication_datetime)}</TableCell>
                    <TableCell align="right" sx={{pr: 3}}>
                        <Chip color="secondary" label="View" size="small"/>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>;
    }

    return (<MainCard title="External Referrals" content={false}>
        <CardContent sx={{p: 0}}>
            <TableContainer>
                <Table>
                    {getTableHead()}

                    {getTableBody()}
                </Table>
            </TableContainer>
        </CardContent>
        <Divider/>
        <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button variant="text" size="small">
                View all Referrals
            </Button>
        </CardActions>
    </MainCard>)
};

export default ExternalReferrals;
