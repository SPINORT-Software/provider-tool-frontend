import * as PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef} from 'react';

// material-ui
import {Card, CardContent, Grid, Typography} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';

import {useDispatch, useSelector} from "react-redux";
import messagingApi from "store/api-calls/messaging";
import {setActiveRecipientMessageHistory} from "store/actions/messagingActions";

// ===========================|| CHAT MESSAGE HISTORY ||=========================== //

const ChatHistory = ({theme, user}) => {
    const wrapper = useRef(document.createElement('div'));
    const el = wrapper.current;
    const scrollToBottom = useCallback(() => {
        el.scrollIntoView(false);
    }, [el]); // scroll to bottom when new message is sent or received
    const dispatch = useDispatch();

    const {username: recipientUsername} = user
    const messagesHistory = useSelector(store => store.messaging.activeChats)
    const recipientMessages = messagesHistory?.[recipientUsername]?.messages

    const getRecipientMessageHistory = async () => {
        const response = await messagingApi.getMessagesHistory()
        // dispatch(setActiveRecipientMessageHistory(response))
    }

    useEffect(() => {
        // getRecipientMessageHistory();
        scrollToBottom()
    }, [recipientMessages?.length, scrollToBottom]);

    const renderMessages = () => {
        if (recipientMessages) {
            return recipientMessages.map((message, index) => (
                <React.Fragment key={index}>
                    {message.sender !== user.username ? (
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={2}/>
                                <Grid item xs={10}>
                                    <Card
                                        sx={{
                                            display: 'inline-block',
                                            float: 'right',
                                            bgcolor:
                                                theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.primary.light
                                        }}
                                    >
                                        <CardContent
                                            sx={{p: '16px', pb: '16px !important', width: 'fit-content', ml: 'auto'}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2"
                                                                color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                                                        {message.message}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        align="right"
                                                        variant="subtitle2"
                                                        color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                    >
                                                        {message.sent_at}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={7}>
                                    <Card
                                        sx={{
                                            display: 'inline-block',
                                            float: 'left',
                                            background:
                                                theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.secondary.light
                                        }}
                                    >
                                        <CardContent sx={{p: '16px', pb: '16px !important'}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">{message.message}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography align="right" variant="subtitle2">
                                                        {message.sent_at}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </React.Fragment>
            ));
        }
        return <></>;
    };

    return (
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing} ref={wrapper}>
                {scrollToBottom()}
                {renderMessages()}
            </Grid>
        </Grid>
    );
};

ChatHistory.propTypes = {
    theme: PropTypes.object,
    user: PropTypes.object
};

export default ChatHistory;
