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
import {setInternalFollowUpData} from "store/actions/dashboard/dashboardActions";
import {convert_backend_datetime_to_ui} from "utils/helpers/datetime";

const InternalFollowUp = () => {
    const dispatch = useDispatch();
    const internalFollowUpStore = useSelector(state => state.dashboard.internalFollowUp.list)

    const fetchInternalFollowUpData = async () => {
        const response = await notificationsApi.listFollowUpsForCurrentUser('internal');
        if ('result' in response && response.result) {
            dispatch(setInternalFollowUpData(response.data))
        } else {
            dispatch(setInternalFollowUpData([]))
        }
    }

    useEffect(() => {
        fetchInternalFollowUpData()
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
            {internalFollowUpStore.slice(0, 3).map((row, index) => (
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

    return (<MainCard title="Internal Follow Up Requests" content={false}>
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
                View all Follow Up Requests
            </Button>
        </CardActions>
    </MainCard>)
};

export default InternalFollowUp;
