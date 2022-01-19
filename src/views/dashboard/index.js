import React, {useContext} from 'react';
import JWTContext from "contexts/JWTContext";
import CaseManagerDashboard from "./casemanager"
import ClientDashboard from "./client"

// ===========================|| ANALYTICS DASHBOARD ||=========================== //

const RoleBasedDashboardIndex = () => {
    const jwtContext = useContext(JWTContext);
    const {user} = jwtContext;

    if (!user) {
        return <></>
    }

    if (typeof (user) === 'object' && ('user_type' in user) && user) {
        // eslint-disable-next-line camelcase
        const {user_type: userType} = user;

        if (userType === 'TYPE_REVIEW_BOARD') {
            return <CaseManagerDashboard />;
        }
        if (userType === 'TYPE_CASE_MANAGER') {
            return <CaseManagerDashboard />;
        }
        if (userType === 'TYPE_CLIENT') {
            return <ClientDashboard />
        }
        if (userType === 'TYPE_COMMUNITY_PARAMEDIC') {
            return <CaseManagerDashboard />
        }
        if (userType === 'TYPE_CLINICIAN') {
            return <CaseManagerDashboard />
        }
    }
    return <></>
};

export default RoleBasedDashboardIndex;
