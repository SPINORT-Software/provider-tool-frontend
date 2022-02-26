import * as React from 'react';
import {IconButton} from "@material-ui/core";

import Tooltip from "@material-ui/core/Tooltip";
import FollowUpIcon from '@material-ui/icons//MarkAsUnreadRounded';
import ReferralIcon from '@material-ui/icons/AssignmentIndOutlined';
import ShareDialogReferral from './share-dialog-referral';
import ShareDialogFollowUp from './share-dialog-follow-up';
import JWTContext from "contexts/JWTContext";

export default function ShareIndex({share_object_id, instance_type, referral_tooltip, followup_tooltip}) {
    const [openReferral, setOpenReferral] = React.useState(false);
    const [openFollowUp, setOpenFollowUp] = React.useState(false);

    const {
        user: {
            user_type_pk: clinicianUUID
        }
    } = React.useContext(JWTContext);


    const handleClickOpenReferral = () => {
        setOpenReferral(true);
    };

    const handleCloseReferral = () => {
        setOpenReferral(false);
    };

    const handleClickOpenFollowUp = () => {
        setOpenFollowUp(true);
    };

    const handleCloseFollowUp = () => {
        setOpenFollowUp(false);
    };

    return (
        <>
            <Tooltip title={referral_tooltip}>
                <IconButton color="secondary" onClick={handleClickOpenReferral}>
                    <ReferralIcon sx={{fontSize: '1.6rem'}}/>
                </IconButton>
            </Tooltip>

            <Tooltip title={followup_tooltip}>
                <IconButton color="secondary" onClick={handleClickOpenFollowUp}>
                    <FollowUpIcon sx={{fontSize: '1.6rem'}} on/>
                </IconButton>
            </Tooltip>

            <ShareDialogReferral open={openReferral}
                                 handleClose={handleCloseReferral}
                                 share_object_id={share_object_id}
                                 instance_type={instance_type}
                                 from_user={clinicianUUID}
            />

            <ShareDialogFollowUp open={openFollowUp}
                                 handleClose={handleCloseFollowUp}
                                 share_object_id={share_object_id}
                                 instance_type={instance_type}
                                 from_user={clinicianUUID}
            />

        </>
    );
};