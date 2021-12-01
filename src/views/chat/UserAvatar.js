import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Avatar, Badge } from '@material-ui/core';

// project imports
import AvatarStatus from './AvatarStatus';

// assets
const avatarImage = require.context('assets/images/users', true);

// ===========================|| CHAT USER AVATAR WITH STATUS ICON ||=========================== //

const UserAvatar = ({ user }) => (
    <Badge
        overlap="circular"
        badgeContent={<AvatarStatus status={user.online_status} />}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
    >
        <Avatar alt={user.fullname} src={user.avatar}/>
    </Badge>
);

UserAvatar.propTypes = {
    user: PropTypes.object
};

export default UserAvatar;
