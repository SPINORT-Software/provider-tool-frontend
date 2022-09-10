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
function createData(avtar, name, age, condition, symptomAlert, bp, hr, spO2, rr, temp, bg, alertsCleared, alertDate) {
    return {avtar, name, age, condition, symptomAlert, bp, hr, spO2, rr, temp, bg, alertsCleared, alertDate};
}

const rows = [
    createData(Avatar1, 'Paul Hoogland', '65 years', 'COPD, CHF', 'Yellow sputum, SOB', '', '', '88', '12', '', '', 'Antonia Arnaert', '9.09.2022 14:30 Phone Call'),
    createData(Avatar1, 'Rebel Waye', '35 years', 'High Risk Pregnancy', 'Pain, Vaginal Bleeding', '140 90', '110', '', '', '', '', 'John Wilson', '9.09.2022 11:25 Text'),
    createData(Avatar1, 'John Doe', '45 years', 'Diabetes, Obesity', 'Blurred Vision, Headaches, Frequent Peeing', '', '', '', '', '', '3.9', 'Richard David', '9.09.2022 10:30 Phone Call'),
    createData(Avatar1, 'Freddy Solomon', '75 years', 'Depression, HPT, Cancer', 'Insomnia, Tearful', '', '', '', '', '', '', 'Richard David', '9.09.2022 08:30 Phone Call'),
];

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //
export default function ClientMonitoringTable() {
    const classes = useStyles();

    return (
        <MainCard title="Client Monitoring" content={false}>
            <CardContent sx={{p: 0}}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell sx={{pl: 3}}>Condition</StyledTableCell>
                                <StyledTableCell>Symptom Alert</StyledTableCell>
                                <StyledTableCell>BP</StyledTableCell>
                                <StyledTableCell>HR</StyledTableCell>
                                <StyledTableCell>SpO2</StyledTableCell>
                                <StyledTableCell>RR</StyledTableCell>
                                <StyledTableCell>Temp</StyledTableCell>
                                <StyledTableCell>BG</StyledTableCell>
                                <StyledTableCell>Alerts Cleared & Action</StyledTableCell>
                            </TableRow>
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
                                    <StyledTableCell>{row.condition}</StyledTableCell>
                                    <StyledTableCell>{row.symptomAlert}</StyledTableCell>
                                    <StyledTableCell>{row.bp}</StyledTableCell>
                                    <StyledTableCell>{row.hr}</StyledTableCell>
                                    <StyledTableCell>{row.spO2}</StyledTableCell>
                                    <StyledTableCell>{row.rr}</StyledTableCell>
                                    <StyledTableCell>{row.temp}</StyledTableCell>
                                    <StyledTableCell>{row.bg}</StyledTableCell>
                                    <StyledTableCell>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Typography component="div" align="left" variant="h5">
                                                    {row.alertsCleared}
                                                </Typography>
                                                <Typography component="div" align="left" variant="string">
                                                    {row.alertDate}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </MainCard>);
}

