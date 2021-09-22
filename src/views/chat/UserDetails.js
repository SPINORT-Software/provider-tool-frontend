import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Avatar, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@material-ui/core';

// project imports
import AvatarStatus from './AvatarStatus';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import PhoneTwoToneIcon from '@material-ui/icons/PhoneTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';


const avatarImage = require.context('assets/images/users', true);

// style constant
const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxWidth: '300px'
    }
}));

// ===========================|| USER PROFILE / DETAILS ||=========================== //

const UserDetails = ({ user }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent
                            sx={{
                                textAlign: 'center',
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Avatar
                                        alt={user.name}
                                        src={user.avatar && avatarImage(`./${user.avatar}`).default}
                                        sx={{
                                            m: '0 auto',
                                            width: '130px',
                                            height: '130px',
                                            border: '1px solid',
                                            borderColor: theme.palette.primary.main,
                                            p: '8px',
                                            bgcolor: 'transparent'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AvatarStatus status={user.online_status} />
                                    <Typography variant="caption" component="div">
                                        {user.online_status.replaceAll('_', ' ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="div">
                                        {user.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" component="div">
                                        {user.role}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <SubCard
                        sx={{
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="div">
                                    Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            <PinDropTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} /> 32188 Sips
                                            Parkways, U.S
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            <PhoneTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} /> 995-250-1803
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            <EmailTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />{' '}
                                            O’Keefe@codedtheme.com
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="div">
                                    Attachment
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <CardMedia
                                                    component="img"
                                                    title="image"
                                                    sx={{ width: '42px', height: '42px' }}
                                                />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6">File Name.jpg</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <CardMedia
                                                    component="img"
                                                    title="image"
                                                    sx={{ width: '42px', height: '42px' }}
                                                />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6">File Name.ai</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <CardMedia
                                                    component="img"
                                                    title="image"
                                                    sx={{ width: '42px', height: '42px' }}
                                                />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Grid container spacing={0}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6">File Name.pdf</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">4/16/2021 07:47:03</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </div>
    );
};

UserDetails.propTypes = {
    user: PropTypes.object
};

export default UserDetails;
