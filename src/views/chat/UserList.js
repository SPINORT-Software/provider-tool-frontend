import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {Chip, Divider, Grid, List, ListItemAvatar, ListItemText, Typography} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// project imports
import UserAvatar from './UserAvatar';

import {useDispatch, useSelector} from "react-redux";
import messagingApi from "store/api-calls/messaging";
import JWTContext from "../../contexts/JWTContext";
import {setActiveRecipientUser, setUserActiveMessagesList} from "../../store/actions/messagingActions";

// ===========================|| CHAT USER LIST ||=========================== //

const UserList = ({setActiveRecipient}) => {
    const [data, setData] = React.useState([]);
    const activeChats = useSelector(store => store.messaging.activeChats)
    const jwtContext = React.useContext(JWTContext);
    const {user: currentUser} = jwtContext;
    const {username: currentUsername} = currentUser;
    const dispatch = useDispatch();

    const getUserActiveRecipientsList = async () => {
        const response = await messagingApi.getUserActiveRecipientsList(currentUsername)
        return response;
    };

    React.useEffect(() => {
        const activeRecipientsList = getUserActiveRecipientsList();

        // dispatch
        // dispatch(setUserActiveMessagesList(response))
    }, []);

    const handleRecipientSelect = (e, recipient) => {
        setActiveRecipient(recipient);
        dispatch(setActiveRecipientUser(recipient));
    }

    const renderRecipientsList = () => {
        if (Object.keys(activeChats).length < 0) {
            return <></>
        }

        return Object.keys(activeChats).map((activeRecipientUsername, index) => {
            const recipient = activeChats[activeRecipientUsername].user;
            const {user_type_pk, fullname} = recipient;

            return (
                <React.Fragment key={user_type_pk}>
                    <ListItemButton
                        onClick={(e) => handleRecipientSelect(e, recipient)}
                    >
                        <ListItemAvatar>
                            <UserAvatar user={recipient}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Grid container alignItems="center" spacing={1} component="span">
                                    <Grid item xs zeroMinWidth component="span">
                                        <Typography
                                            variant="h5"
                                            color="inherit"
                                            component="span"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                display: 'block'
                                            }}
                                        >
                                            {fullname}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                        />
                    </ListItemButton>
                    <Divider/>
                </React.Fragment>
            )
        })
    }


    return (
        <List component="nav">
            {renderRecipientsList()}
        </List>
    );
};

UserList.propTypes = {
    setActiveRecipient: PropTypes.func
};

export default UserList;
