import * as React from 'react';
import {CircularProgress} from "@material-ui/core";

const ProgressCircularControlled = ({display}) => {
    if (display) {
        return <CircularProgress/>
    }
    return <fragment/>
};

export default ProgressCircularControlled;