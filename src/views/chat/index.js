import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import JWTContext from "contexts/JWTContext";


// material-ui
import {makeStyles, styled, useTheme} from '@material-ui/styles';
import {
    Box,
    CardContent,
    ClickAwayListener,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Popper,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import Picker, {SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';

// project imports
import UserDetails from './UserDetails';
import ChatDrawer from './ChatDrawer';
import ChatHistory from './ChatHistory';
import AvatarStatus from './AvatarStatus';
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import axios from 'utils/axios';
import {SET_MENU} from 'store/actionTypes';
import {appDrawerWidth as drawerWidth, gridSpacing} from 'store/constant';

// assets
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import VideoCallTwoToneIcon from '@material-ui/icons/VideoCallTwoTone';
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import {w3cwebsocket as W3CWebSocket} from "websocket";

// redux
import {setNewMessageSend} from 'store/actions/messagingActions';

const avatarImage = require.context('assets/images/users', true);

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        width: '100%',
        height: 'calc(100vh - 440px)',
        overflowX: 'hidden',
        minHeight: '525px'
    },
    smallDrawer: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto'
        }
    }
}));

const socketChatClient = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/');

// drawer content element
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

// ===========================|| APPLICATION CHAT ||=========================== //

/**
 * CURRENT USER UUID = currentUserUUID
 * Use the currentUserUUID to send and receive messages
 * @returns {JSX.Element|string}
 * @constructor
 */
const ChatMainPage = () => {
    const jwtContext = React.useContext(JWTContext);
    const {user: currentUser} = jwtContext;
    const {user_type_pk: currentUserUUID, username: currentUsername} = currentUser

    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const selectedRecipient = useSelector(store => store.messaging.selectedRecipient)

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // handle right sidebar dropdown menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickSort = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    // set chat details page open when user is selected from sidebar
    const [emailDetails, setEmailDetails] = React.useState(false);
    const handleUserChange = () => {
        setEmailDetails((prev) => !prev);
    };

    // toggle sidebar
    const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
    };

    // close sidebar when widow size below 'md' breakpoint
    React.useEffect(() => {
        setOpenChatDrawer(!matchDownSM);
    }, [matchDownSM]);

    const [activeRecipient, setActiveRecipient] = useState({});
    const getUserData = async () => {
        const response = await axios.post('/api/chat/users/id', {id: 1});
        setActiveRecipient(response.data);
    };

    React.useEffect(() => {
        // hide left drawer when email app opens
        dispatch({type: SET_MENU, opened: false});
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch chat history for selected user
    React.useEffect(() => {
        socketChatClient.onopen = () => {
            console.log("Socket opened");
        }

        socketChatClient.onmessage = (e) => {
            console.log("On message")
            const newMessageData = JSON.parse(e.data)

            if (newMessageData.message) {
                console.log("Message received ", newMessageData.message)
            } else {
                console.log("Message is empty")
            }

            const d = new Date();
            const newMessage = {
                sender: newMessageData.sender, 
                recipient: newMessageData.recipient,
                message: newMessageData.message,
                message_type: newMessageData.message_type,
                sent_at: newMessageData.sent_at,
            };

            console.log("Message received ")
            console.log(newMessage)

            // the newMessage could be from any user in the system. dispatch this message to a generic function to set
            // it to 'activeChats' in messagingReducer.
            // if the message is from the selectedRecipient - set it in selectedRecipientHistory and add it to selected
            // setData((prevState) => [...prevState, newMessage]);
        }

        // getData(user);
    }, [activeRecipient]);

    // handle new message form
    const [message, setMessage] = useState('');
    const handleOnSend = () => {
        if(!message && message.length < 1){
            return false;
        }

        const {username: recipientUsername} = selectedRecipient;
        const d = new Date();
        const messageSendTime = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

        /**
         * Send Message to WebSocket API
         */
        setMessage('');
        const newMessageToSend = {
            'message': message,
            'message_type': 'text',  // [model_instance,text]
            'sender': currentUsername,
            'recipient': recipientUsername,
            'sent_at': messageSendTime
        }
        socketChatClient.send(JSON.stringify(newMessageToSend))

        // TODO : Do this
        // TODO : dispatch action to add to selectedRecipientHistory in reducer
        dispatch(setNewMessageSend(newMessageToSend, recipientUsername))

        return true;
    };

    const handleEnter = (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        handleOnSend();
    };

    // handle emoji
    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const [anchorElEmoji, setAnchorElEmoji] = React.useState(null);
    const handleOnEmojiButtonClick = (event) => {
        setAnchorElEmoji(anchorElEmoji ? null : event.currentTarget);
    };
    const emojiOpen = Boolean(anchorElEmoji);
    const emojiId = emojiOpen ? 'simple-popper' : undefined;
    const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
    };

    if (!currentUser) return 'Loading...';

    return (
        <Box sx={{display: 'flex'}}>
            <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen}
                        setActiveRecipient={setActiveRecipient}/>


            <Main open={openChatDrawer}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} xs={12}>
                        <MainCard
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : theme.palette.grey[50]
                            }}
                        >
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="" spacing={0.5}>
                                        <Grid item>
                                            <IconButton onClick={handleDrawerOpen}>
                                                <MenuRoundedIcon/>
                                            </IconButton>
                                        </Grid>

                                        <Grid item>
                                            <Grid container spacing={2} alignItems="center" sx={{flexWrap: 'nowrap'}}>
                                                <Grid item>
                                                    <Avatar alt={activeRecipient.fullname}
                                                            src={activeRecipient.avatar && avatarImage(`./${activeRecipient.avatar}`).default}/>
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Grid container spacing={0} alignItems="center">
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" component="div">
                                                                {activeRecipient.fullname} <AvatarStatus
                                                                status={activeRecipient.online_status}/>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle2">Last
                                                                seen {activeRecipient.lastMessage}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm zeroMinWidth/>
                                        <Grid item>
                                            <IconButton>
                                                <CallTwoToneIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton>
                                                <VideoCallTwoToneIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleUserChange}>
                                                <ErrorTwoToneIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{mt: theme.spacing(2)}}/>
                                </Grid>

                                {
                                    /**
                                     * User Chat History Messages Component
                                     */
                                }
                                <PerfectScrollbar className={classes.ScrollHeight}>
                                    <CardContent>
                                        <ChatHistory
                                            theme={theme}
                                            user={activeRecipient}
                                        />
                                    </CardContent>
                                </PerfectScrollbar>

                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <IconButton ref={anchorElEmoji} aria-describedby={emojiId}
                                                        onClick={handleOnEmojiButtonClick}>
                                                <MoodTwoToneIcon/>
                                            </IconButton>
                                            <Popper
                                                id={emojiId}
                                                open={emojiOpen}
                                                anchorEl={anchorElEmoji}
                                                disablePortal
                                                popperOptions={{
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [-20, 20]
                                                            }
                                                        }
                                                    ]
                                                }}
                                            >
                                                <ClickAwayListener onClickAway={handleCloseEmoji}>
                                                    <MainCard elevation={8} content={false}>
                                                        <Picker
                                                            onEmojiClick={onEmojiClick}
                                                            skinTone={SKIN_TONE_MEDIUM_DARK}
                                                            disableAutoFocus
                                                        />
                                                    </MainCard>
                                                </ClickAwayListener>
                                            </Popper>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <TextField
                                                fullWidth
                                                label="Type a Message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyPress={handleEnter}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton>
                                                <AttachmentTwoToneIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="primary" onClick={handleOnSend}>
                                                <SendTwoToneIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>

                    {emailDetails ? (
                        <Grid item className={classes.smallDrawer}>
                            <Box sx={{display: {xs: 'block', sm: 'none'}}}>
                                <IconButton onClick={handleUserChange} sx={{mb: '-80px'}}>
                                    <HighlightOffTwoToneIcon/>
                                </IconButton>
                            </Box>
                            <UserDetails user={activeRecipient}/>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
            </Main>
        </Box>
    );
};

export default ChatMainPage;
