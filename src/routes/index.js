import {useRoutes} from 'react-router-dom';
import React, {useContext} from 'react';

// project imports
import CaseManagerRoutes from './role-based-routes/CaseManagerRoutes';
import ExternalPartnerRoutes from './role-based-routes/ExternalPartnerRoutes';
import ClinicianRoutes from './role-based-routes/ClinicianRoutes';
import CommunityParamedicRoutes from './role-based-routes/CommunityParamedicRoutes';
import ReviewBoardRoutes from './role-based-routes/ReviewBoardRoutes';
import ClientRoutes from './role-based-routes/ClientRoutes';
import LoginRoutes from './LoginRoutes';
import CommonRoutes from './common-routes';
import HomeRoute from './common-routes/home';

import JWTContext from "contexts/JWTContext";

// export default function ThemeRoutes() {
//     return useRoutes([LoginRoutes, CaseManagerRoutes, CommunityParamedicRoutes, ReviewBoardRoutes, ClientRoutes, CommonRoutes, HomeRoute]);
// }

const makeRoutes = (user) => {
    let routes = [LoginRoutes, CommonRoutes, HomeRoute];

    if (!user) {
        return routes
    }

    // eslint-disable-next-line camelcase
    const {user_type: userType} = user;

    if (typeof (user) === 'object' && ('user_type' in user) && user) {
        switch (userType) {
            case 'TYPE_CASE_MANAGER':
                routes = [
                    ...routes,
                    CaseManagerRoutes
                ]
                break;
            case 'TYPE_CLINICIAN':
                routes = [
                    ...routes,
                    ClinicianRoutes
                ]
                break;
            case 'TYPE_CLIENT':
                routes = [
                    ...routes,
                    ClientRoutes
                ]
                break;
            case 'TYPE_COMMUNITY_PARAMEDIC':
                routes = [
                    ...routes,
                    CommunityParamedicRoutes
                ]
                break;
            case 'TYPE_REVIEW_BOARD':
                routes = [
                    ...routes,
                    ReviewBoardRoutes
                ]
                break;
            case 'TYPE_EXTERNAL_PARTNER':
                routes = [
                    ...routes,
                    ExternalPartnerRoutes
                ]
                break;
            default:
                routes = [
                    ...routes
                ]
        }
    }

    return routes
}

const Routes = () => {
    const jwtContext = useContext(JWTContext);
    const {user} = jwtContext;

    const routes = makeRoutes(user)
    return useRoutes(routes);
}

export default Routes;