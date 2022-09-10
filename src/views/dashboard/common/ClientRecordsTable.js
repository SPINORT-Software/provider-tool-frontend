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
function createData(avtar, name, age, familialFaces, frailtyIndex, mmse, assessments, safetyList, medication) {
    return {
        avtar,
        name,
        age,
        familialFaces, frailtyIndex, mmse, assessments, safetyList, medication
    };
}

const rows = [
    createData(Avatar1, 'Paul Hoogland', '65 years', '', '9.09.2022', '', '8.07.2022', '', '25.08.2022'),
    createData(Avatar1, 'Rebel Waye', '35 years', '', '', '31.08.2022', '', '', ''),
    createData(Avatar1, 'John Doe', '45 years', '', '9.09.2022', '', '', ''),
    createData(Avatar1, 'Freddy Solomon', '75 years', '1.08.2021', '25.08.2022', '', '', '', ''),
];

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //

export default function ClientRecordsTable() {
    const classes = useStyles();

    return (
        <MainCard title="Client Records" content={false}>
            <CardContent sx={{p: 0}}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Upload Alert</StyledTableCell>
                                <StyledTableCell>Familial Faces</StyledTableCell>
                                <StyledTableCell>Frailty Index</StyledTableCell>
                                <StyledTableCell>MMSE</StyledTableCell>
                                <StyledTableCell>Assessments</StyledTableCell>
                                <StyledTableCell>Safety List</StyledTableCell>
                                <StyledTableCell>Medication</StyledTableCell>
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
                                    <StyledTableCell>O</StyledTableCell>
                                    <StyledTableCell>{row.familialFaces}</StyledTableCell>
                                    <StyledTableCell>{row.frailtyIndex}</StyledTableCell>
                                    <StyledTableCell>{row.mmse}</StyledTableCell>
                                    <StyledTableCell>{row.assessments}</StyledTableCell>
                                    <StyledTableCell>{row.safetyList}</StyledTableCell>
                                    <StyledTableCell>{row.medication}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </MainCard>);
}
