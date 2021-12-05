import React from 'react';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    CardContent,
    Button,
    Divider, FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem, Radio, RadioGroup, Slider,
    Switch,
    TextField,
    Typography
} from '@material-ui/core';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const HomeSafetyAssessment = () => {
    const theme = useTheme();

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    Test
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default HomeSafetyAssessment;
