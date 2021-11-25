import { useRoutes } from 'react-router-dom';

// project imports
import CaseManagerRoutes from './role-based-routes/CaseManagerRoutes';
import ReviewBoardRoutes from './role-based-routes/ReviewBoardRoutes';
import LoginRoutes from './LoginRoutes';
import CommonRoutes from './common-routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([LoginRoutes, CaseManagerRoutes, ReviewBoardRoutes, CommonRoutes]);
}
