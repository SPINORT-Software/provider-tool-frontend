import React from 'react';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    ListItemText,
    List,
    Slide,
    Toolbar,
    Typography,
    Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip
} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// assets
import CloseIcon from '@material-ui/icons/Close';
import PageViewIcon from "@material-ui/icons/PageviewTwoTone";

// style constant
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },

    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    fulldialog: {
        '& .MuiPaper-root': {
            padding: '0px'
        }
    }
}));

// slide animation
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function FullScreenDialog({forms}) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="View Attached Assessment Forms">
                <Button variant="contained" onClick={handleClickOpen}
                        startIcon={<PageViewIcon/>}>
                    View Assessment Forms
                </Button>
            </Tooltip>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}
                    className={classes.fulldialog}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h3" color="inherit" className={classes.title}>
                            Assessment Forms
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{pl: 3}}>File Name</TableCell>
                                <TableCell sx={{pl: 3}}>Assessment Type</TableCell>
                                <TableCell align="left">Upload Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {forms.map((row) => (
                                <TableRow hover  key={row.assessment_form_id}>
                                    <TableCell sx={{pl: 3}} component="th" scope="row">
                                        {row.document.name}
                                    </TableCell>
                                    <TableCell align="left">{row.assessment_type}</TableCell>
                                    <TableCell align="left">{row.document.uploaded_at}</TableCell>
                                    <TableCell align="left">
                                        <Button>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Dialog>
        </div>
    );
}
