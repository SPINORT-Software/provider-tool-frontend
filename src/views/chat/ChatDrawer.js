import * as PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Button,
    Drawer,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';


// project imports
import UserList from './UserList';
import AvatarStatus from './AvatarStatus';
import UserAvatar from './UserAvatar';
import MainCard from 'ui-component/cards/MainCard';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';

// assets
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LayersTwoToneIcon from "@material-ui/icons/LayersTwoTone";
import PersonAddAlt from '@material-ui/icons/PersonAddAlt';
import UsersSearchList from "./UsersSearchList";

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        height: 'calc(100vh - 445px)',
        overflowX: 'hidden',
        minHeight: '520px',
        [theme.breakpoints.down('md')]: {
            height: 'calc(100vh - 190px)',
            minHeight: 0
        }
    }
}));

// ===========================|| CHAT DRAWER ||=========================== //

const ChatDrawer = ({ handleDrawerOpen, openChatDrawer, setActiveRecipient }) => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // Users Search List Dialog
    const [userssearchlistopen, setUserssearchlistopen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setUserssearchlistopen(true);
    };
    const handleCloseDialog = () => {
        setUserssearchlistopen(false);
    };

    // show menu to set current user status
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickRightMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseRightMenu = () => {
        setAnchorEl(null);
    };

    // set user status on status menu click
    const [status, setStatus] = React.useState('available');
    const handleRightMenuItemClick = (statusData) => () => {
        setStatus(statusData);
        handleCloseRightMenu();
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: { xs: 1100, md: 0 },
                '& .MuiDrawer-paper': {
                    height: 'auto',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                    border: 'none',
                    borderRadius: `${customization.borderRadius}px`,
                    [theme.breakpoints.down('md')]: {
                        borderRadius: '0px'
                    }
                }
            }}
            variant={matchDownSM ? 'temporary' : 'persistent'}
            anchor="left"
            open={openChatDrawer}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
        >
            <MainCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : theme.palette.grey[50]
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                            <Grid item>
                                <UserAvatar user={{ online_status: status, avatar: 'avatar-5.png', name: 'User 1' }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="h4">
                                    Test User
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleClickRightMenu}>
                                    <ExpandMoreIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseRightMenu}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleRightMenuItemClick('available')}>
                                        <AvatarStatus status="available" mr={1} />
                                        Available
                                    </MenuItem>
                                    <MenuItem onClick={handleRightMenuItemClick('do_not_disturb')}>
                                        <AvatarStatus status="do_not_disturb" mr={1} />
                                        Do not disturb
                                    </MenuItem>
                                    <MenuItem onClick={handleRightMenuItemClick('offline')}>
                                        <AvatarStatus status="offline" mr={1} />
                                        Offline
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button fullWidth variant="outlined" onClick={handleClickOpenDialog} endIcon={<PersonAddAlt />}>
                            Start Conversation
                        </Button>

                        <UsersSearchList open={userssearchlistopen} handleCloseDialog={handleCloseDialog} />
                    </Grid>


                    <Grid item xs={12}>
                        <OutlinedInput
                            fullWidth
                            id="input-search-header"
                            placeholder="Search Messages"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon fontSize="small" />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PerfectScrollbar className={classes.ScrollHeight}>
                            <UserList setActiveRecipient={setActiveRecipient} />
                        </PerfectScrollbar>
                    </Grid>
                </Grid>
            </MainCard>
        </Drawer>
    );
};

ChatDrawer.propTypes = {
    handleDrawerOpen: PropTypes.func,
    openChatDrawer: PropTypes.bool,
    setActiveRecipient: PropTypes.func
};

export default ChatDrawer;
