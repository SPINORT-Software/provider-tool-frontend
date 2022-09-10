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
import {makeStyles, withStyles} from "@material-ui/styles";

// style constant
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: `${theme.palette.common.white} !important`
    },
    body: {
        fontSize: 15,
        minWidth: 100,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 200,
        "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)"
        }
    }
});

// table data
function createData(avtar, name, age, referringProvider, referringProviderRole, date, reason, specialistName, specialization, referralStatus) {
    return {
        avtar,
        name,
        age,
        referringProvider,
        referringProviderRole,
        date,
        reason,
        specialistName,
        specialization,
        referralStatus
    };
}

const rows = [
    createData(Avatar1, 'Paul Hoogland', '65 years', 'Wilhelmine Dung', 'Nurse', '8.09.2022', 'COPD Rehabilitation Program', 'Liz Dell', 'COPD Rehab Specialist', 'Received - In progress', '10.09.2022'),
    createData(Avatar1, 'Rebel Waye', '35 years', 'Keefe Liam', 'Community Nurse', '5.09.2022', 'Ultrasound', 'Camilla Lewis', 'Midwife', 'Appointment scheduled', '1.10.2022'),
    createData(Avatar1, 'John Doe', '45 years', 'Lazaro Gang', 'MD', '31.08.2022', 'Eye Exam', 'Scott Pascal', 'Ophthalmologist', 'Contacted Patient', '1.10.2022'),
    createData(Avatar1, 'Freddy Solomon', '75 years', 'Alene Mayor', 'Social Worker', '25.08.2022', 'MH Consult', 'Marcus Lost', 'MH Psychologist', 'Received - In progress', '1.10.2022'),
];

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

export default function  ClientReferralsTable() {
    const classes = useStyles();

    return (
        <MainCard title="Client Referrals" content={false}>
            <CardContent sx={{p: 0}}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Referring Provider</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Reason</StyledTableCell>
                                <StyledTableCell>Specialist</StyledTableCell>
                                <StyledTableCell>Referral Status</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow hover key={index}>
                                    <StyledTableCell sx={{pl: 3}}>
                                        <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                                            <Grid item>
                                                <Avatar alt="User 1"/>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography component="div" align="left" variant="h5">
                                                    {row.name}
                                                </Typography>
                                                <Typography component="div" align="left" variant="string">
                                                    {row.age}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell sx={{pl: 3}}>
                                        <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                                            <Grid item>
                                                <Avatar alt="User 1"/>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography component="div" align="left" variant="h5">
                                                    {row.referringProvider}
                                                </Typography>
                                                <Typography component="div" align="left" variant="string">
                                                    {row.referringProviderRole}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell>{row.date}</StyledTableCell>
                                    <StyledTableCell>{row.reason}</StyledTableCell>
                                    <StyledTableCell sx={{pl: 3}}>
                                        <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                                            <Grid item xs zeroMinWidth>
                                                <Typography component="div" align="left" variant="h5">
                                                    {row.specialistName}
                                                </Typography>
                                                <Typography component="div" align="left" variant="string">
                                                    {row.specialization}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                    <StyledTableCell>{row.referralStatus}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </MainCard>);
}
