import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, ListItemIcon, ListItemText,
    TextField,
} from '@material-ui/core';


import ListItemButton from "@material-ui/core/ListItemButton";
import PersonIcon from "@material-ui/icons/Person";

// project imports
import {gridSpacing} from 'store/constant';
import commonApi from "store/api-calls/common";
import {setSearchUsersList, setSearchUsersListSelected} from 'store/actions/messagingActions';
import {useDispatch} from "react-redux";

// style constant
const useStyles = makeStyles({
    searchDialog: {
        '&>div:nth-child(3)': {
            '&>div': {
                maxWidth: '1000px'
            }
        }
    },
    reviewContainer: {
        marginTop: '0px',
        marginBottom: '0px'
    },
    topScrollPaper: {
        alignItems: 'flex-start',
    },
    topPaperScrollBody: {
        verticalAlign: 'top',
    },
    userListResult: {
        width: '100%',
        height: 270,
    }
});

const UsersSearchList = ({open, handleCloseDialog}) => {
    const classes = useStyles();
    const [userslist, setUserslist] = React.useState([]);
    const dispatch = useDispatch();

    const handleChange = async (event) => {
        setUserslist([]);
        const searchValue = event.target.value;
        if (searchValue.length > 0) {
            const response = await commonApi.searchUser(searchValue);
            setUserslist(response)
            dispatch(setSearchUsersList(response))
        } else {
            setUserslist([]);
        }
    }

    const selectUserToSendMessage = (event, user) => {
        dispatch(setSearchUsersListSelected(user)) // dispatch action to SET the user selected from the search list.
        handleCloseDialog() // close the search users list dialog.
        setUserslist([]) // clear the results displayed in the search dialog.
    }

    const renderUsers = () => {
        if (userslist.length > 0) {
            return userslist.map((user) => {
                const userFullName = `${user.first_name} ${user.last_name}`;

                return <ListItemButton key={user.user_type_pk} onClick={(e) => selectUserToSendMessage(e, user)}>
                    <ListItemIcon>
                        <PersonIcon sx={{fontSize: '1.3rem'}}/>
                    </ListItemIcon>
                    <ListItemText primary={
                        <div>{userFullName}</div>
                    }/>
                </ListItemButton>
            });
        }
        return <fragment/>;
    }

    return (
        <>
            <Dialog fullWidth maxWidth='sm' open={open} onClose={handleCloseDialog} classes={{
                scrollPaper: classes.topScrollPaper,
                paperScrollBody: classes.topPaperScrollBody,
            }}>
                <DialogTitle>Search Users</DialogTitle>
                <DialogContent>
                    <Grid container spacing={gridSpacing} className={classes.reviewContainer}>
                        <Grid item xs={12}>
                            <TextField id="messaging-users-search-text"
                                       fullWidth
                                       label="User"
                                       onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}
                              className={classes.userListResult}>
                            {userslist && renderUsers()}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={handleCloseDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

UsersSearchList.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default UsersSearchList;
