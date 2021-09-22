import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// ===========================|| AVATAR STATUS ICONS ||=========================== //

const AvatarStatus = ({ status, mr }) => {
    const theme = useTheme();
    switch (status) {
        case 'available':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.success.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr
                    }}
                />
            );

        case 'do_not_disturb':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.warning.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr
                    }}
                />
            );

        case 'offline':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.error.dark,
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        mr
                    }}
                />
            );

        default:
            return null;
    }
};

AvatarStatus.propTypes = {
    status: PropTypes.string,
    mr: PropTypes.number
};

export default AvatarStatus;
