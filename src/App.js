import React from 'react';
import {connect, useSelector} from 'react-redux';

import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, StyledEngineProvider} from '@material-ui/core';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';

// auth provider
import {FirebaseProvider} from 'contexts/FirebaseContext';
import {JWTProvider} from 'contexts/JWTContext';
// import {Auth0Provider} from 'contexts/Auth0Context';

import * as actions from './store/actions';
import {fetchSectionAttributes, fetchSectionAttributesByRole} from "store/actions";


// ===========================|| APP ||=========================== //

const App = ({fetchSectionAttributesByRole}) => {
    const customization = useSelector((state) => state.customization);

    // React.useEffect(() => {
    //     fetchSectionAttributesByRole('43701c82-01c7-484e-9aaf-c90901542216')
    // }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline/>
                {/* RTL layout */}
                {/* <RTLLayout> */}
                <Locales>
                    <NavigationScroll>
                        <JWTProvider>
                            <Routes/>
                            <Snackbar/>
                        </JWTProvider>
                    </NavigationScroll>
                </Locales>
                {/* </RTLLayout> */}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

const mapStateToProps = state => ({
    sectionData: state.sectionForm
})

const mapDispatchToProps = dispatch => ({
    fetchSectionAttributesByRole: (roleID) => dispatch(actions.fetchSectionAttributesByRole(roleID))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
