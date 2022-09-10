import React from 'react';

// material-ui
import {makeStyles} from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card, CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@material-ui/core';

// assets
import {IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto} from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';

import MainCard from 'ui-component/cards/MainCard';
// style constant
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
        }
    },
    listAction: {
        top: '22px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },

    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    itemAction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
        }
    }
}));

// ===========================|| NOTIFICATION LIST ITEM ||=========================== //

const NotificationsDashboard = () => {
    const classes = useStyles();

    return (
        <MainCard title="Notifications" content={false}>
            <CardContent>
                <List className={classes.navContainer}>
                    <div className={classes.itemAction}>
                        <ListItem alignItems="center" className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar alt="John Doe" src={User1}/>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>}/>
                            <ListItemSecondaryAction className={classes.listAction}>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom
                                                    className={classes.actionColor}>
                                            2 min ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className={classes.listContainer}>
                            <Grid item xs={12} className={classes.paddingBottom}>
                                <Typography variant="subtitle2">You have been assigned a client by the review board.</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Chip label="Unread" className={classes.listChipError}/>
                                    </Grid>
                                    <Grid item>
                                        <Chip label="New" className={classes.listChipWarning}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider className={classes.listDivider}/>
                    <div className={classes.itemAction}>
                        <ListItem alignItems="center" className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatarPrimary}>
                                    <IconMailbox stroke={1.5} size="1.3rem"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>}/>
                            <ListItemSecondaryAction className={classes.listAction}>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Typography variant="caption" display="block" gutterBottom
                                                    className={classes.actionColor}>
                                            20 min ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className={classes.listContainer}>
                            <Grid item xs={12} className={classes.paddingBottom}>
                                {/* amit comment */}
                                <Typography variant="subtitle2">You have 2 new unread Case Management messages</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        <Button variant="contained" disableElevation>
                                            Messages
                                            <IconBrandTelegram stroke={1.5} size="1.3rem" className={classes.sendIcon}/>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider className={classes.listDivider}/>
                </List>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small">
                    View all Notifications
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default NotificationsDashboard;
