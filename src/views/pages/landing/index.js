import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import AppBar from 'ui-component/extended/AppBar';

// style constant
const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: '30px',
        overflowX: 'hidden',
        overflowY: 'clip',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '0px'
        }
    },
    sectionWhite: {
        paddingTop: '160px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '60px'
        }
    }
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
    const classes = useStyles();

    return (
        <>
            <div id="home" className={classes.header}>
                <div>
                    Home Index
                </div>
                <AppBar />
            </div>
        </>
    );
};

export default Landing;
