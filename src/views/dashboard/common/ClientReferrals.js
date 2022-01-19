import React from 'react';

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
import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar4 from 'assets/images/users/avatar-4.png';
import MainCard from 'ui-component/cards/MainCard';

// table data
function createData(avtar, name, designation, product, date, badgeText, badgeType) {
    return {avtar, name, designation, product, date, badgeText, badgeType};
}

const rows = [
    createData(Avatar1, 'John Deo', '', 'Case Manager', 'Jun, 26', 'View', 'secondary'),
    createData(Avatar2, 'Jenifer Vintage', '', 'Case Manager', 'March, 31', 'View', 'primary'),
    createData(Avatar3, 'William Jem', '', 'Case Manager', 'Aug, 02', 'View', 'secondary'),
    createData(Avatar4, 'David Jones', '', 'Case Manager', 'Sep, 22', 'View', 'primary')
];

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

const ClientReferrals = () => (
    <MainCard title="Review Board Referrals" content={false}>
        <CardContent sx={{ p: 0 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell sx={{pl: 3}}>Assigned</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right" sx={{pr: 3}}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{pl: 3}}>
                                    <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                                        <Grid item>
                                            <Avatar alt="User 1"/>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography component="div" align="left" variant="subtitle1">
                                                {row.name}
                                            </Typography>
                                            <Typography component="div" align="left" variant="subtitle2">
                                                {row.designation}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row.product}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="right" sx={{pr: 3}}>
                                    <Chip color={row.badgeType} label={row.badgeText} size="small"/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text" size="small">
                View all Referrals
            </Button>
        </CardActions>
    </MainCard>


);

export default ClientReferrals;
